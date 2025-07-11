import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoansModule } from './loans/loans.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [UsersModule, LoansModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
