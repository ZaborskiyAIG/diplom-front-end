import {Injectable} from '@angular/core';

@Injectable()
export class Demands {
  // constructor(name: string) {
  //   this.name = name;
  // }

  constructor() {
  }

  id: number;
  rank: number;
  name: string;
  color: string;
  description: string;
}
