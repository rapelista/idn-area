import { BaseEntity } from '../../../common/entity/base.entity';
import { Village } from '../../villages/entities/village.entity';
export declare class Location extends BaseEntity {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    village: Village;
}
