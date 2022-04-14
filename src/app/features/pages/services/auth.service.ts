import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILoginUser, IResponseLogin } from '../sign-in/interfaces/sign-in.interface';
import { IUser, IResponseSignUp, IResponseCkeckEmail } from '../sign-up/interfaces/sign-up.interfaces';
import { config } from '../../../../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(body: IUser): Observable<IResponseSignUp> {
    return this.http.post<IResponseSignUp>(config.URL + 'users', body);
  }

  checkEmail(email: string) {
    return this.http.get<IResponseCkeckEmail>(config.URL + 'users/' + email)
  }

  signIn(body: ILoginUser): Observable<IResponseLogin> {
    return this.http.post<IResponseLogin>(config.URL + 'users/login', body);
  }
}
