import { BaseEntity } from '../../../common/entity/base.entity';
import { Regency } from '../../regencies/entities/regency.entity';
export declare class Island extends BaseEntity {
    code: string;
    name: string;
    coordinates: string;
    regency: Regency;
}
