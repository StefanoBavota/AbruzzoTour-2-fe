import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IReview, IReviewCreatedResponse, IReviewResponse } from '../../home/interfaces/review.interface';
import { config } from '../../../../../config';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviewsByUserIdList: IReview[] = [];

  constructor(private http: HttpClient) { }

  getReviewByUserId(userId: number): Observable<IReviewResponse> {
    return this.http.get<IReviewResponse>(config.URL + "reviews/userId/" + userId)
      .pipe(
        tap((res: IReviewResponse) => this.reviewsByUserIdList = res.data)
      )
  }

  createReview(body: IReview): Observable<IReviewCreatedResponse> {
    return this.http.post<IReviewCreatedResponse>(config.URL + 'reviews', body);
  }

  updateReview(body: IReview): Observable<IReviewCreatedResponse> {
    return this.http.put<IReviewCreatedResponse>(config.URL + 'reviews', body);
  }
}
