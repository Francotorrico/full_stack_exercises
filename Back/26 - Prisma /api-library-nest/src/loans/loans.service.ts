import { Injectable } from '@nestjs/common';
import { LoansRepository } from './repositories/loans.repositorys';
import { LoanDto } from './dto/loan.dto';


@Injectable()
export class LoansService {
    constructor(private readonly repository: LoansRepository) { }

    create(dto: LoanDto): Promise<LoanDto> {
        return this.repository.createLoan(dto.userId, dto.bookId);
    }

    findByUser(userId: number): Promise<LoanDto[]> {
        return this.repository.findLoanByUserId(userId);
    }
}
