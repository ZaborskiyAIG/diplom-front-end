import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Demands} from '../models/Demands';
import {User} from '../models/User';

@Injectable()
export class UserHttp {

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:5557/api/user`);
  }

  login(login: string, password: string): Observable<User> {
    return this.http.post<User>(`http://localhost:5557/api/user/login`, {login, password})
      .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  register(user: User): Observable<any> {
    return this.http.post(`http://localhost:5557/api/user/registration`, user);
  }
}
