import { TokenPayload } from '../interfaces/token-payload.interface';
export declare class TokenResponseDto implements TokenPayload {
    id: number;
    username: string;
    email: string;
    role: string;
}
