
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IResponseUpdateUser, IUser } from 'src/app/features/pages/sign-up/interfaces/sign-up.interfaces';
import { config } from '../../../../../config';

@Injectable({
  providedIn: 'root',
})
export class UpdatePasswordService {
  constructor(private router: Router, private http: HttpClient) { }

  updatePassword(body: IUser): Observable<IResponseUpdateUser> {
    return this.http.put<IResponseUpdateUser>(config.URL + 'users', body);
  }
}
