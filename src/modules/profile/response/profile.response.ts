import { Expose } from 'class-transformer';

export class ProfileResponse {
    @Expose()
    id: number;

    @Expose()
    email: number;

    @Expose()
    name: string;

    @Expose()
    avatar: string;

    @Expose()
    phoneNumber: string;
}
