import { BaseEntity } from '../../../common/entity/base.entity';
import { Regency } from '../../regencies/entities/regency.entity';
export declare class Province extends BaseEntity {
    code: string;
    name: string;
    regencies: Regency[];
}
