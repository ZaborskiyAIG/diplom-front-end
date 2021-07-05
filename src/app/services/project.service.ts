import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/Project';

@Injectable()
export class ProjectHttp {

  constructor(private http: HttpClient) {

  }

  getPatterns(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:5557/api/project');
  }

}
