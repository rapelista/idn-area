import { BaseEntity } from '../../../common/entity/base.entity';
import { Regency } from '../../regencies/entities/regency.entity';
import { Village } from '../../villages/entities/village.entity';
export declare class District extends BaseEntity {
    code: string;
    name: string;
    villages: Village[];
    regency: Regency;
}
