import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";



export class BookDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    author: string;
    @IsString()
    @IsNotEmpty()
    publisher: string;
    
    @IsOptional()
    @IsBoolean()
    available?: boolean;

}