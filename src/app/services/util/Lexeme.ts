import {Injectable} from '@angular/core';


export enum LexemeType {
  LEFT_BRACKET = 'LEFT_BRACKET',
  RIGHT_BRACKET = 'RIGHT_BRACKET',
  OP_PLUS = 'OP_PLUS',
  OP_MINUS = 'OP_MINUS',
  OP_MUL = 'OP_MUL',
  OP_DIV = 'OP_DIV',
  NUMBER = 'NUMBER',
  EOF = 'EOF'
}

@Injectable()
export class Lexeme {

  constructor(type: LexemeType, value: string) {
    this.type = type;
    this.value = value;
  }

  // constructor() {
  //
  // }

  type: LexemeType;
  value: string;
}
