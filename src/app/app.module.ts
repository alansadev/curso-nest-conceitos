import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceptsModule } from 'src/concepts/concepts.module';
import { ConceitosModule } from 'src/conceitos/conceitos.module';

@Module({
  imports: [ConceptsModule, ConceitosModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
