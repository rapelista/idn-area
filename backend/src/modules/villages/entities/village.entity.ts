import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { District } from '../../districts/entities/district.entity';
import { Location } from '../../locations/entities/location.entity';

@Entity()
export class Village extends BaseEntity {
  @Column()
  @Index({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToOne(() => Location, (location) => location.village, {
    nullable: true,
  })
  location: Location;

  @ManyToOne(() => District, (district) => district.villages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    referencedColumnName: 'code',
  })
  district: District;
}
