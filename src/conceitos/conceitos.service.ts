import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosService {
  getHome(): string {
    return 'conceitos - Conceitos';
  }
}
