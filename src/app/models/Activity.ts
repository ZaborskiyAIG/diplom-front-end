import {Injectable} from '@angular/core';
import {Demands} from './Demands';

@Injectable()
export class Activity {
  // constructor(name: string) {
  //   this.name = name;
  // }

  constructor() {
  }

  id: number;
  mainId: number;
  name: string;
  demands: Demands[];
}

