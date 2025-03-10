import { Role } from '../enum/role.enum';
export declare class ResponseUserDto {
    id: number;
    username: string;
    fullName: string;
    role: Role;
    email: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}
