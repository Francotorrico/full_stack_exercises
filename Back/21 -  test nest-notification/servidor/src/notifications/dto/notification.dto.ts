import { IsString, IsNotEmpty, IsIn } from 'class-validator';


export class NotificationDto {
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsNotEmpty()
    @IsIn(['info', 'warning', 'error', 'success'])
    type: 'info' | 'warning' | 'error' | 'success';
}


