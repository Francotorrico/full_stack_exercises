import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repositorys';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor(private readonly repository: UsersRepository) {}

    findAll() {
        return this.repository.findAll();
    }

    findById(id: number) {
        return this.repository.findById(id);
    }

    create(userData: UserDto) {
        return this.repository.create(userData);
    }

    update(id: number, user: UserDto) {
        return this.repository.update(id, user);
    }

    delete(id: number) {
        return this.repository.delete(id);
    }
}
