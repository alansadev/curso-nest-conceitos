import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceptsService {
  solucionaHome(): string {
    return 'Home do concepts solucionada';
  }
}
