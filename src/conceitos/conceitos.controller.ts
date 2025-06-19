import { Controller, Get } from '@nestjs/common';

@Controller('conceitos')
export class ConceitosController {
  @Get()
  home(): string {
    return 'Conceitos';
  }
}
