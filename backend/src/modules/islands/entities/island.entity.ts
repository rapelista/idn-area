import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Regency } from '../../regencies/entities/regency.entity';

@Entity()
export class Island extends BaseEntity {
  @Column({ nullable: false })
  @Index({ unique: true })
  code: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  coordinates: string;

  @ManyToOne(() => Regency, (regency) => regency.islands, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    referencedColumnName: 'code',
  })
  regency: Regency;
}
