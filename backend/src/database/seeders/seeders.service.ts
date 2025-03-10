import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../common/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../../common/user/enum/role.enum';
import { Province } from '../../modules/provinces/entities/province.entity';
import { Regency } from '../../modules/regencies/entities/regency.entity';
import { District } from '../../modules/districts/entities/district.entity';
import { Village } from '../../modules/villages/entities/village.entity';
import { Island } from '../../modules/islands/entities/island.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as csvParser from 'csv-parser';

@Injectable()
export class SeedersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
    @InjectRepository(Regency) private regencyRepository: Repository<Regency>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Village) private villageRepository: Repository<Village>,
    @InjectRepository(Island) private islandRepository: Repository<Island>,
  ) {}

  async seedBaseData() {
    await this.seedUsers();
    await this.seedProvinces();
    await this.seedRegencies();
    await this.seedDistricts();
    await this.seedVillages();
    await this.seedIslands();
  }

  private async seedUsers() {
    const users: Partial<User>[] = [
      {
        username: 'superadmin',
        role: Role.ADMIN,
        password: await bcrypt.hash('superadmin@123', 10),
        email: 'superadmin@gmail.com',
      },
      {
        username: 'johnDoe',
        role: Role.STAFF,
        password: await bcrypt.hash('123456', 10),
        email: 'johnDoe@gmail.com',
      },
    ];
    await this.userRepository.upsert(users, ['username']);
  }

  private async seedProvinces() {
    const provinces: Partial<Province>[] = [];
    fs.createReadStream(path.join(__dirname, '../../../data/provinces.csv'))
      .pipe(csvParser())
      .on('data', (row) => {
        provinces.push({
          code: row.code,
          name: row.name,
        });
      })
      .on('end', async () => {
        await this.provinceRepository.upsert(provinces, ['code']);
      });
  }

  private async seedRegencies() {
    const regencies: {
      code: string;
      name: string;
      province: { code: string };
    }[] = [];
    fs.createReadStream(path.join(__dirname, '../../../data/regencies.csv'))
      .pipe(csvParser())
      .on('data', (row) => {
        regencies.push({
          code: row.code,
          name: row.name,
          province: { code: row.province_code },
        });
      })
      .on('end', async () => {
        await this.regencyRepository.upsert(regencies, ['code']);
      });
  }

  private async seedDistricts() {
    const districts: {
      code: string;
      name: string;
      regency: { code: string };
    }[] = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, '../../../data/districts.csv'))
        .pipe(csvParser())
        .on('data', (row) => {
          // Validasi data sebelum diproses
          if (!row.code || !row.name || !row.regency_code) {
            console.warn(`Skipping invalid row:`, row);
            return;
          }

          districts.push({
            code: row.code.trim(),
            name: row.name.trim(),
            regency: { code: row.regency_code.trim() },
          });
        })
        .on('end', async () => {
          try {
            const batchSize = 5000; // Batasi jumlah data per batch
            for (let i = 0; i < districts.length; i += batchSize) {
              const batch = districts.slice(i, i + batchSize);
              await this.districtRepository.upsert(batch, ['code']);
            }
            console.log(`Seeded ${districts.length} districts successfully`);
            resolve();
          } catch (error) {
            console.error('Error seeding districts:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('CSV read error:', error);
          reject(error);
        });
    });
  }

  private async seedVillages() {
    const villages: {
      code: string;
      name: string;
      district: { code: string };
    }[] = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, '../../../data/villages.csv'))
        .pipe(csvParser())
        .on('data', (row) => {
          // Validasi data sebelum diproses
          if (!row.code || !row.name || !row.district_code) {
            console.warn(`Skipping invalid row:`, row);
            return;
          }

          villages.push({
            code: row.code.trim(),
            name: row.name.trim(),
            district: { code: row.district_code.trim() },
          });
        })
        .on('end', async () => {
          try {
            const batchSize = 5000; // Batasi jumlah data per batch
            for (let i = 0; i < villages.length; i += batchSize) {
              const batch = villages.slice(i, i + batchSize);
              await this.villageRepository.upsert(batch, ['code']);
            }
            console.log(`Seeded ${villages.length} villages successfully`);
            resolve();
          } catch (error) {
            console.error('Error seeding villages:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('CSV read error:', error);
          reject(error);
        });
    });
  }

  private async seedIslands() {
    const islands: {
      code: string;
      coordinates: string;
      name: string;
      regency: { code: string };
    }[] = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, '../../../data/islands.csv'))
        .pipe(csvParser())
        .on('data', (row) => {
          if (!row.code || !row.coordinate || !row.regency_code) {
            console.warn(`Skipping invalid row:`, row);
            return;
          }

          const coordinateParts = row.coordinate.split(',');
          if (coordinateParts.length < 4) {
            console.warn(`Skipping invalid coordinate:`, row.coordinate);
            return;
          }

          const [latLong] = coordinateParts; // Ambil hanya lat-long pertama

          const payload = {
            code: row.code.trim(),
            coordinates: latLong.trim(),
            name: coordinateParts[3].trim(), // Ambil nama dari koordinat
            regency: { code: row.regency_code.trim() },
          };

          islands.push(payload);
        })
        .on('end', async () => {
          try {
            const batchSize = 5000; // Batas jumlah data per batch
            for (let i = 0; i < islands.length; i += batchSize) {
              const batch = islands.slice(i, i + batchSize);
              await this.islandRepository.upsert(batch, ['code']);
            }
            console.log(`Seeded ${islands.length} islands successfully`);
            resolve();
          } catch (error) {
            console.error('Error seeding islands:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('CSV read error:', error);
          reject(error);
        });
    });
  }
}
