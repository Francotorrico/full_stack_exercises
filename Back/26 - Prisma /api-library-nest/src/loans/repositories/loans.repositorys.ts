import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { LoanDto } from 'src/loans/dto/loan.dto';


@Injectable()
export class LoansRepository {
    private prisma = new PrismaClient();



    public async createLoan(userId: number, bookId: number): Promise<LoanDto> {
        const book = await this.prisma.book.findUnique({
            where: {
                id: bookId
            }
        });
        if (!book) {
            throw new Error('Book not found');
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!book.available) {
            throw new Error('Book not available');
        }
        if (!user) {
            throw new Error('User not found');
        }

        await this.prisma.book.update({
            where: { id: bookId },
            data: { available: false },
        });

        return await this.prisma.loan.create({
            data: {
                userId: userId,
                bookId: bookId,
                loanDate: new Date()
            }
        });

    }

    public async findLoanByUserId(userId: number): Promise<LoanDto[]> {
        return await this.prisma.loan.findMany({
            where: {
                userId: userId,
            },
            include: {
                book: true,
            },

        });
    }

}