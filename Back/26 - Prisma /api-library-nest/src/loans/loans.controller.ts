import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoanDto } from './dto/loan.dto';


@Controller('loans')
export class LoansController {
    constructor(private readonly service: LoansService) { }

    @Post()
    create(@Body() dto: LoanDto) {
        return this.service.create(dto);
    }

    @Get('user/:userId')
    findByUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.service.findByUser(userId);
    }
    
}
