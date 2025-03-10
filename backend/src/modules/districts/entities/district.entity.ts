import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Regency } from '../../regencies/entities/regency.entity';
import { Village } from '../../villages/entities/village.entity';

@Entity()
export class District extends BaseEntity {
  @Column()
  @Index({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Village, (village) => village.district)
  villages: Village[];

  @ManyToOne(() => Regency, (regency) => regency.districts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    referencedColumnName: 'code',
  })
  regency: Regency;
}
