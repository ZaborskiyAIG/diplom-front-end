import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Activity} from 'src/app/models/Activity';
import {Observable} from 'rxjs';
import {Demands} from '../models/Demands';

@Injectable()
export class DashboardHttp {

  constructor(private http: HttpClient) {

  }

  postActivity(activity: Activity): Observable<Activity[]> {
    return this.http.post<Activity[]>('http://localhost:5557/api/dashboard/activity', activity);
  }

  getActivity(): Observable<Activity[]> {
    return this.http.get<Activity[]>('http://localhost:5557/api/dashboard/activity');
  }

  deleteActivity(id: number): Observable<string> {
    console.log(id);
    return this.http.delete<string>('http://localhost:5557/api/dashboard/activity/' + id);
  }

  putActivity(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>('http://localhost:5557/api/dashboard/activity', activity);
  }

  postDemand(demand: Demands, id: number): Observable<Demands> {
    return this.http.post<Demands>('http://localhost:5557/api/dashboard/demand/' + id + '?projectId=' + 1, demand); //TODO 1 - проджект id, временно
  }

  putRankAndActivityDemand(demand: Demands, id: number, predRank: number): Observable<Demands> {
    return this.http.put<Demands>('http://localhost:5557/api/dashboard/demand/' + id + '?predRank=' + predRank, demand);
  }

  putDemand(demand: Demands): Observable<Demands> {
    return this.http.put<Demands>('http://localhost:5557/api/dashboard/demand', demand);
  }

  deleteDemand(id: number): Observable<string> {
    console.log(id);
    return this.http.delete<string>('http://localhost:5557/api/dashboard/demand/' + id);
  }
}
