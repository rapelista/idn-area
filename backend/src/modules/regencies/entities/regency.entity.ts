import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Province } from '../../provinces/entities/province.entity';
import { Island } from '../../islands/entities/island.entity';
import { District } from '../../districts/entities/district.entity';

@Entity()
export class Regency extends BaseEntity {
  @Column({ nullable: false })
  @Index({ unique: true })
  code: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Island, (island) => island.regency)
  islands: Island[];

  @OneToMany(() => District, (district) => district.regency)
  districts: District[];

  @ManyToOne(() => Province, (province) => province.regencies, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    referencedColumnName: 'code',
  })
  province: Province;
}
