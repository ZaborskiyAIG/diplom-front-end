import {Injectable} from '@angular/core';
import {CriteriaRank} from './CriteriaRank';

@Injectable()
export class TableRank {

  constructor() {
  }

  id: number;
  nameDemand: string;
  mark: number;
  criteria: CriteriaRank[];
}
