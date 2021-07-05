import {Injectable} from '@angular/core';

@Injectable()
export class CriteriaRank {

  constructor() {
  }

  id: number;
  nameCriteria: string;
  abbreviation: string;
  mark: number;
}
