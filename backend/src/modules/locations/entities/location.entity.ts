import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Village } from '../../villages/entities/village.entity';

@Entity()
export class Location extends BaseEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToOne(() => Village, (village) => village.location, {
    nullable: true,
  })
  @JoinColumn({
    referencedColumnName: 'code',
  })
  village: Village;
}
