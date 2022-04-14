import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseTravel, ITravel } from '../interfaces/travel.interface';
import { config } from '../../../../../config';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private http: HttpClient) { }

  /**
   * Add path in personal route for logged user
   *
   * @param body {ITravel}
   */
  addUserRoute(body: ITravel): Observable<IResponseTravel> {
    return this.http.post<IResponseTravel>(config.URL + 'travels', body)
  }
}
