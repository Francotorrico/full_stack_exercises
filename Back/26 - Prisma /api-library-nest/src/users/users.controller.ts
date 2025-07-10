import { 
    Controller,
    Get,
    Post,
    Param,
    Body,
    Put,
    Delete
 } from '@nestjs/common';
 import { UsersService } from './users.service';
 import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findById(id);
    }

    @Post()
    create(@Body() user: UserDto) {
        return this.service.create(user);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() user: UserDto) {
        return this.service.update(id, user);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }

}
