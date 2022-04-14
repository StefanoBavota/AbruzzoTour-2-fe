import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPathResponse, IMappedPath, IPath } from '../interfaces/path.interface';
import { map, tap } from 'rxjs/operators';
import { IReview, IReviewResponse } from '../interfaces/review.interface';
import { config } from '../../../../../config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  pathList: IMappedPath[] = [];
  reviewsByPathIdList: IReview[] = [];

  constructor(private http: HttpClient) { }

  getAllPaths(): Observable<IMappedPath[]> {
    return this.http.get<IPathResponse>(config.URL + "paths")
      .pipe(
        map((res: IPathResponse) => {
          for (let obj of res.data) {
            this.pathList.push({
              ...obj,
              tagName: '',
              tagColor: '',
              tagIcon: '',
              distance: 0,
            })
          }
          // mapping array of paths
          for (let path of this.pathList) {
            if (path.difficulty) {
              switch (path.difficulty) {
                case 'EASY': {
                  path.tagName = 'light';
                  path.tagColor = 'success';
                  path.tagIcon = 'leaf';
                  break;
                }
                case 'MEDIUM': {
                  path.tagName = 'middle';
                  path.tagColor = 'warning';
                  path.tagIcon = 'fitness';
                  break;
                }
                case 'HARD': {
                  path.tagName = 'hard';
                  path.tagColor = 'danger';
                  path.tagIcon = 'barbell';
                  break;
                }
              }
            }
          }
          return this.pathList;
        })
      )
  }

  getPathById(id: number): IMappedPath {
    return this.pathList.find((path: IPath) => path.pathId === id)
  }

  getAllReviews(pathId: number): Observable<IReviewResponse> {
    return this.http.get<IReviewResponse>(config.URL + "reviews/" + pathId)
      .pipe(
        tap((res: IReviewResponse) => this.reviewsByPathIdList = res.data)
      )
  }
}
