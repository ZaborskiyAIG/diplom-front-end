import {Lexeme, LexemeType} from './Lexeme';
import {LexemeBuffer} from './LexemeBuffer';
import {Injectable} from '@angular/core';



@Injectable()
export class Parser {

  lexAnalyze(expText: string): Lexeme[] {
    const lexemes: Lexeme[] = [];
    let pos = 0;
    while (pos < expText.length) {
      let c = expText.charAt(pos);
      switch (c) {
        case '(':
          const lexeme = {type: LexemeType.LEFT_BRACKET, value: c};
          lexemes.push(lexeme);
          pos++;
          continue;
        case ')':
          lexemes.push(new Lexeme(LexemeType.RIGHT_BRACKET, c));
          pos++;
          continue;
        case '+':
          lexemes.push(new Lexeme(LexemeType.OP_PLUS, c));
          pos++;
          continue;
        case '-':
          console.log('xxxxx');
          lexemes.push(new Lexeme(LexemeType.OP_MINUS, c));
          pos++;
          continue;
        case '*':
          lexemes.push(new Lexeme(LexemeType.OP_MUL, c));
          pos++;
          continue;
        case '/':
          lexemes.push(new Lexeme(LexemeType.OP_DIV, c));
          pos++;
          continue;
        default:
          if (c <= '9' && c >= '0') {
            let sb = '';
            do {
              sb = sb + c;
              pos++;
              if (pos >= expText.length) {
                break;
              }
              c = expText.charAt(pos);
            } while (c <= '9' && c >= '0');
            lexemes.push(new Lexeme(LexemeType.NUMBER, sb.toString()));
          } else {
            if (c !== ' ') {
               console.log('Unexpected character: ' + c);
            }
            pos++;
          }
      }
    }
    lexemes.push(new Lexeme(LexemeType.EOF, ''));
    return lexemes;
  }

  expr(lexemes: LexemeBuffer): number {
    const lexeme: Lexeme = lexemes.next();
    if (lexeme.type === LexemeType.EOF) {
      return 0;
    } else {
      lexemes.back();
      return this.plusminus(lexemes);
    }
  }

  plusminus(lexemes: LexemeBuffer): number {
    let value: number = this.multdiv(lexemes);
    while (true) {
      const lexeme: Lexeme = lexemes.next();
      switch (lexeme.type) {
        case LexemeType.OP_PLUS:
          value += this.multdiv(lexemes);
          break;
        case LexemeType.OP_MINUS:
          console.log('---?');
          value -= this.multdiv(lexemes);
          break;
        case LexemeType.EOF:
        case LexemeType.RIGHT_BRACKET:
          lexemes.back();
          return value;
        default:
          console.log('Unexpected token: ' + lexeme.value
            + ' at position: ' + lexemes.getPos());
      }
    }
  }

  multdiv(lexemes: LexemeBuffer): number {
    let value = this.factor(lexemes);
    while (true) {
      const lexeme: Lexeme = lexemes.next();
      switch (lexeme.type) {
        case LexemeType.OP_MUL:
          value *= this.factor(lexemes);
          break;
        case LexemeType.OP_DIV:
          value /= this.factor(lexemes);
          break;
        case LexemeType.EOF:
        case LexemeType.RIGHT_BRACKET:
        case LexemeType.OP_PLUS:
        case LexemeType.OP_MINUS:
          lexemes.back();
          return value;
        default:
          console.log('Unexpected token: ' + lexeme.value
            + ' at position: ' + lexemes.getPos());
      }
    }
  }

  factor(lexemes: LexemeBuffer): number {
    let lexeme: Lexeme = lexemes.next();
    switch (lexeme.type) {
      case LexemeType.NUMBER:
        return parseFloat(lexeme.value);
      case LexemeType.LEFT_BRACKET:
        console.log('((?');
        const value: number = this.plusminus(lexemes);
        lexeme = lexemes.next();
        if (lexeme.type !== LexemeType.RIGHT_BRACKET) {
          console.log('Unexpected token: ' + lexeme.value
            + ' at position: ' + lexemes.getPos());
        }
        return value;
      default:
        console.log('Unexpected token: ' + lexeme.value
          + ' at position: ' + lexemes.getPos());
    }
  }

}
