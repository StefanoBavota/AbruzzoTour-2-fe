import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITravelPath, ITravelResponse } from '../interface/travel.interface';
import { config } from '../../../../../config';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  travelList: ITravelPath[] = [];

  constructor(private http: HttpClient) { }

  getAllTravels(userId: number): Observable<ITravelResponse> {
    return this.http.get<ITravelResponse>(config.URL + "travels/" + userId)
      .pipe(
        tap((res: ITravelResponse) => this.travelList = res.data)
      )
  }
}
