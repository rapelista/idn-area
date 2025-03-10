import { BaseEntity } from '../../entity/base.entity';
import { Role } from '../enum/role.enum';
export declare class User extends BaseEntity {
    username: string;
    email: string;
    password: string;
    role: Role;
    image?: string;
    hashPassword(): Promise<void>;
}
