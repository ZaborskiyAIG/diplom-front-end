import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Demands} from '../models/Demands';
import {ListCriteria} from '../models/ListCriteria';
import {Pattern} from '../models/Pattern';
import {TableRank} from '../models/TableRank';


@Injectable()
export class PatternHttp {

  constructor(private http: HttpClient) {

  }

  getRatings(patternId: number): Observable<TableRank[]> {
    return this.http.get<TableRank[]>('http://localhost:5557/api/rating/' + patternId + '?projectId=' + 1);
  }

  getPatterns(): Observable<Pattern[]> {
    return this.http.get<Pattern[]>('http://localhost:5557/api/pattern');
  }

  deleteCriteria(id: number): Observable<ListCriteria[]> {
    return this.http.delete<ListCriteria[]>('http://localhost:5557/api/pattern/criteria/' + id);
  }

  deletePattern(id: number): Observable<Pattern[]> {
    return this.http.delete<Pattern[]>('http://localhost:5557/api/pattern/' + id);
  }

  postCriteria(criteria: ListCriteria, id: number): Observable<ListCriteria> {
    return this.http.post<ListCriteria>('http://localhost:5557/api/pattern/' + id + '/criteria' + '?projectId=' + 1, criteria); //TODO projectId
  }

  pathMarkRating(ratingId: number, mark: number): Observable<ListCriteria> {
    return this.http.patch<ListCriteria>('http://localhost:5557/api/rating/' + ratingId, mark); //TODO projectId
  }

  postPattern(pattern: Pattern): Observable<Pattern> {
    return this.http.post<Pattern>('http://localhost:5557/api/pattern/', pattern);
  }

}
