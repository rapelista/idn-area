import { Repository } from 'typeorm';
import { User } from '../../common/user/entities/user.entity';
import { Province } from '../../modules/provinces/entities/province.entity';
import { Regency } from '../../modules/regencies/entities/regency.entity';
import { District } from '../../modules/districts/entities/district.entity';
import { Village } from '../../modules/villages/entities/village.entity';
import { Island } from '../../modules/islands/entities/island.entity';
export declare class SeedersService {
    private userRepository;
    private provinceRepository;
    private regencyRepository;
    private districtRepository;
    private villageRepository;
    private islandRepository;
    constructor(userRepository: Repository<User>, provinceRepository: Repository<Province>, regencyRepository: Repository<Regency>, districtRepository: Repository<District>, villageRepository: Repository<Village>, islandRepository: Repository<Island>);
    seedBaseData(): Promise<void>;
    private seedUsers;
    private seedProvinces;
    private seedRegencies;
    private seedDistricts;
    private seedVillages;
    private seedIslands;
}
