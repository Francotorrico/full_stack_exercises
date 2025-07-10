import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import {UserDto} from 'src/users/dto/user.dto';


@Injectable()
export class UsersRepository {
    private prisma= new PrismaClient();

    public async findAll(): Promise<UserDto[]> {
        return await this.prisma.user.findMany();
    }

    public async findById(id: number): Promise<UserDto|null> {
        return await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    public async create(user: UserDto): Promise<UserDto> {
        return await this.prisma.user.create({
            data: user
        });
    }

    public async update(id: number, user: UserDto): Promise<UserDto|null> {
        return await this.prisma.user.update({
            where: {
                id: id
            },
            data: user
        });
    }

    public async delete(id: number): Promise<boolean> {
        try{
            await this.prisma.user.delete({
                where: {
                    id: id
                }
            });
            return true;
        }catch{
            return false;
        }
    }
}