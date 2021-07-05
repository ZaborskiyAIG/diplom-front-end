import {Injectable} from '@angular/core';
import {Lexeme} from './Lexeme';

@Injectable()
export class LexemeBuffer {

  constructor(lexemes: Lexeme[]) {
    this.lexemes = lexemes;
  }

  pos = 0;
  lexemes: Lexeme[];

  next(): Lexeme {
    return this.lexemes[this.pos++];
  }

  back(): void {
    this.pos--;
  }

  getPos(): number {
    return this.pos;
  }
}
