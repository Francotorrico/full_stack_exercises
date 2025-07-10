import { Module } from '@nestjs/common';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { LoansRepository } from './repositories/loans.repositorys';

@Module({
  controllers: [LoansController],
  providers: [LoansService, LoansRepository]
})
export class LoansModule {}
