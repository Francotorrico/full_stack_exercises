import { Injectable } from '@nestjs/common';
import { BooksRepository } from './repositories/books.repositorys';
import { BookDto } from './dto/book.dto';
@Injectable()
export class BooksService {
    constructor(private readonly repository: BooksRepository) { }

    findAvailable(): Promise<BookDto[]> {
        return this.repository.findAvailable();
    }
    create(book: BookDto): Promise<BookDto> {
        return this.repository.createBook(book);
    }
}
