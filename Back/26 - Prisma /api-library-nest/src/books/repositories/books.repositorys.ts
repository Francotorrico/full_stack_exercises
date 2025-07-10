import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { BookDto } from 'src/books/dto/book.dto';


@Injectable()
export class BooksRepository {
    private prisma = new PrismaClient();

    public async findAvailable(): Promise<BookDto[]> {
        return await this.prisma.book.findMany({
            where: {
                available: true
            }
        });
    }

    public async createBook(book: BookDto): Promise<BookDto> {
        return await this.prisma.book.create({
            data: {
                title: book.title,
                author: book.author,
                publisher: book.publisher,
                available: book.available ?? true
            }
        });
    }
}