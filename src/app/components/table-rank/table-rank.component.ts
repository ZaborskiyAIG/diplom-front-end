import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TableRank} from '../../models/TableRank';
import {CriteriaRank} from '../../models/CriteriaRank';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormulaHttp} from '../../services/formula.http';
import {Formula} from '../../models/Formula';
import {Pattern} from '../../models/Pattern';
import {PatternHttp} from '../../services/pattern.http';
import {Parser} from '../../services/util/Parser';
import {Lexeme} from '../../services/util/Lexeme';
import {LexemeBuffer} from '../../services/util/LexemeBuffer';

@Component({
  selector: 'app-table-rank',
  templateUrl: './table-rank.component.html',
  styleUrls: ['./table-rank.component.css']
})
export class TableRankComponent implements OnInit, AfterViewInit {
  pattern: Pattern[];
  patt: Pattern = new Pattern();
  table: TableRank[];

  displayedColumns: string[] = [];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private formulaHttp: FormulaHttp, private patternHttp: PatternHttp, private parses: Parser) {  }

   async ngAfterViewInit(): Promise<void> {
    this.table = await this.patternHttp.getRatings(this.patt.id).toPromise();

    console.log(this.table);


    await this.table.forEach(value => this.summa(value));

    this.table.sort((x, y) => x.mark - y.mark);

     console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
     console.log(this.patt);
    this.displayedColumns = [];
    await this.displayedColumns.push('first');
    await this.patt.criteria.forEach(value => {
      console.log('sss   ' + value.name);
       this.displayedColumns.push(value.name);
     });
    await this.displayedColumns.push('last');
    this.dataSource = await new MatTableDataSource(this.table);
    this.dataSource.sort = await this.sort;
  }

  async ngOnInit(): Promise<void> {
    this.pattern = await this.patternHttp.getPatterns().toPromise();
    this.patt = await this.pattern[0];
  }

  // async changeSelectInit(patt: Pattern): Promise<void> {
  //   this.patt = patt;
  // }

  onBlur(criteria: CriteriaRank): void {
    this.patternHttp.pathMarkRating(criteria.id, criteria.mark).subscribe();
  }

  summa(element: TableRank): number {
    let result: number;
    let formulaParser = this.patt.formula;
    element.criteria.forEach(value => {

      if (value.mark === null) {
        value.mark = 0;
      }

      if (value.mark < 0) {
        formulaParser = formulaParser.replaceAll(new RegExp(value.abbreviation, 'g'), '(0' + value.mark.toString() + ')');
      } else {
        formulaParser = formulaParser.replaceAll(new RegExp(value.abbreviation, 'g'), value.mark.toString());
      }
    });

    const lexemes: Lexeme[] = this.parses.lexAnalyze(formulaParser);
    result = this.parses.expr(new LexemeBuffer(lexemes));
    console.log(formulaParser);
    console.log(result);
    this.table.forEach(value => {
      if (value.id === element.id) {
          value.mark = result;
      }
    });


    return result;
  }
}
