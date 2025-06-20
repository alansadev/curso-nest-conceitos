import { Module } from '@nestjs/common';
import { ConceitosController } from './conceitos.controller';
import { ConceitosService } from './conceitos.service';

@Module({
  controllers: [ConceitosController],
  providers: [ConceitosService],
})
export class ConceitosModule {}
