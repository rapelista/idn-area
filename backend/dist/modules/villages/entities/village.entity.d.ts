import { BaseEntity } from '../../../common/entity/base.entity';
import { District } from '../../districts/entities/district.entity';
import { Location } from '../../locations/entities/location.entity';
export declare class Village extends BaseEntity {
    code: string;
    name: string;
    location: Location;
    district: District;
}
