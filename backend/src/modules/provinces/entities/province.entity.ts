import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Regency } from '../../regencies/entities/regency.entity';

@Entity()
export class Province extends BaseEntity {
  @Column({ nullable: false })
  @Index({ unique: true })
  code: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Regency, (regency) => regency.province)
  regencies: Regency[];
}
