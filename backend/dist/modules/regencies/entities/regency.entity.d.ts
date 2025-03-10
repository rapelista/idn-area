import { BaseEntity } from '../../../common/entity/base.entity';
import { Province } from '../../provinces/entities/province.entity';
import { Island } from '../../islands/entities/island.entity';
import { District } from '../../districts/entities/district.entity';
export declare class Regency extends BaseEntity {
    code: string;
    name: string;
    islands: Island[];
    districts: District[];
    province: Province;
}
