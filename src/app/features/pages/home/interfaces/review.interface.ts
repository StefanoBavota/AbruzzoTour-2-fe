import { IAllResponse } from "./path.interface";

export interface IReview {
  reviewId: number;
  reviewTitle: string;
  description: string;
  firstName: string;
  imgLink: string;
  title?: string;
  pathId?: number;
}

export interface IReviewCreatedResponse {
  success: boolean;
  messge: string;
}

export type IReviewResponse = IAllResponse<IReview>;


