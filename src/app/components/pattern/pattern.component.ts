import {Component, OnInit, Inject} from '@angular/core';
import {PatternHttp} from '../../services/pattern.http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Pattern} from '../../models/Pattern';
import {ListCriteria} from '../../models/ListCriteria';
import {DialogCriteriaComponent} from './dialog-criteria/dialog.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.scss']
})
export class PatternComponent implements OnInit {
  // criteria: ListCriteria[] = [
  //   {id: 1, name: '1111', abbreviation: '1'},
  //   {id: 2, name: '2222', abbreviation: '2'},
  //   {id: 2, name: '3333', abbreviation: '3'}
  // ];

  // pattern: Pattern[] = [
  //   {id: 1, name: 'паттерн 1', formula: 'a+b', criteria: this.criteria, min: 0, max: 10, step: 5},
  //   {id: 2, name: 'паттерн 2', formula: '(a+b)/x', criteria: this.criteria, min: 0, max: 10, step: 2}
  //   ]; // заглушка
  //
  pattern: Pattern[];
  patt: Pattern = new Pattern();
  newPattern: Pattern = {id: null, name: 'Новый шаблон', formula: null, criteria: null, min: null, max: null, step: null};
  displayedColumns: string[] = ['name', 'abbreviation', 'delete'];


  constructor(private patternHttp: PatternHttp, public dialog: MatDialog) {
    this.patt = this.newPattern;
    console.log( this.pattern);
  }

  ngOnInit(): void {
    this.patternHttp.getPatterns().subscribe(data => {
      data.unshift(this.newPattern);
      this.pattern = data;
    });
//    this.pattern
  }

  addPattern(): void {
    console.log(this.patt.id);
    console.log(this.patt.name);
    console.log(this.patt.formula);
    console.log(this.patt.min);
    console.log(this.patt.max);
    this.patternHttp.postPattern(this.patt).subscribe(result => {
      this.patt.id = result.id;
    });
    const newPattern2: Pattern = {
      id: null,
      name: 'Новый шаблон',
      formula: null,
      criteria: null,
      min: null,
      max: null,
      step: null
    };
    this.pattern.unshift(newPattern2); //костыль, после того, как паттерн добавиться,
    // хотелось бы иметь возможноть создать еще один новый паттерн
  }

  deleteCriteria(id: number, i: number, pattern: Pattern): void {  // метод для удаления критерия
   this.patternHttp.deleteCriteria(id).subscribe(result => {
     this.patt.criteria = result;
   });
  }

  deletePattern(id: number): void {
    console.log(id);
    this.patternHttp.deletePattern(id).subscribe(result => {
      result.unshift(this.newPattern);
      this.pattern = result;
    });
    this.patt = this.newPattern;
  }

  addCriteria(criteria: ListCriteria, id: number): void {  // метод для добавления критерия
    this.patternHttp.postCriteria(criteria, id).subscribe(res => {
      this.pattern.forEach((value, index, array) => {
        if (value.id === id) {
          console.log('прокнуло');
          console.log(res);
          console.log(this.pattern);
          console.log(id);

          if(this.pattern[index].criteria === null) {
            this.pattern[index].criteria = [];
            console.log('ssss');
          }

          this.patt.criteria = this.patt.criteria.concat(res);
          //value.criteria.push(res);
        }
      });
    });
  }

  openDialogDemand(id: number): void {
    const dialogRef = this.dialog.open(DialogCriteriaComponent, {
      width: '500px',
      data: new ListCriteria()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        console.log('result = nulll');
      } else {
        console.log(result);
        this.addCriteria(result, id);
        // const demand = new Demands();
        // demand.name = result.name;
        // demand.color = result.color;
        // this.addDemand(result);  ///добавления критерия
      }
    });
  }

}
