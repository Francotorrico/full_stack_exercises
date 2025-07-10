import { 
    Controller, 
    Post,
    Body,
    Get,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly service: BooksService) { }
    
    @Post()
    public create(@Body() book: BookDto) {
        return this.service.create(book);
    }

    @Get('available')
    public findAvailable() {
        return this.service.findAvailable();
    }
}
