import { Module } from '@nestjs/common';
import { ConceitosController } from './conceitos.controller';

@Module({
  controllers: [ConceitosController],
})
export class ConceitosModule {}
