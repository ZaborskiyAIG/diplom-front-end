import {Injectable} from '@angular/core';
import {ListCriteria} from './ListCriteria';

@Injectable()
export class Pattern {

  constructor() {
  }

  id: number;
  name: string;
  formula: string;
  criteria: ListCriteria[];
  min: number;
  max: number;
  step: number;
}
