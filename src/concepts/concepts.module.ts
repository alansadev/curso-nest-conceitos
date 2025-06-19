import { Module } from '@nestjs/common';
import { ConceptsController } from './concepts.controller';

@Module({
  controllers: [ConceptsController],
})
export class ConceptsModule {}
