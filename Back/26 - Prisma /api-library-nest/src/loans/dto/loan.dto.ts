import { IsInt } from "class-validator";


export class LoanDto {
    
    @IsInt()
    userId: number;
    @IsInt()
    bookId: number;
    
}