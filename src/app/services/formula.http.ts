import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class FormulaHttp {

  constructor(private http: HttpClient) {

  }

  getResultFormula(id: number, formula: string): Observable<string> {
    return this.http.patch<string>('http://localhost:5557/api/formula/' + id + '/result', formula);
  }

  // deleteCriteria(id: number): Observable<ListCriteria[]> {
  //   return this.http.delete<ListCriteria[]>('http://localhost:5557/api/pattern/criteria/' + id);
  // }
  //
  // deletePattern(id: number): Observable<Pattern[]> {
  //   return this.http.delete<Pattern[]>('http://localhost:5557/api/pattern/' + id);
  // }
  //
  // postCriteria(criteria: ListCriteria, id: number): Observable<ListCriteria> {
  //   return this.http.post<ListCriteria>('http://localhost:5557/api/pattern/' + id + '/criteria', criteria);
  // }
  //
  // postPattern(pattern: Pattern): Observable<Pattern> {
  //   return this.http.post<Pattern>('http://localhost:5557/api/pattern/', pattern);
  // }

}
