export interface IPath {
  pathId: number;
  title: string;
  description: string;
  shortDescription: string;
  time: string;
  difficulty: DifficultyEnum;
  imgLink: string;
  coordinates?: ICoordinate[];
}

export interface ICoordinate {
  latitude: number;
  longitude: number;
}

export enum DifficultyEnum {
  "EASY" = "EASY",
  "MEDIUM" = "MEDIUM",
  "HARD" = "HARD"
}

export interface IMappedPath extends IPath {
  tagName: string;
  tagColor: string;
  tagIcon: string;
  distance: number;
}


export interface ISinglePathResponse {
  success: boolean;
  data: IPath;
}

export type IPathResponse = IAllResponse<IPath>;

export interface IAllResponse<T> {
  success: boolean;
  data: T[];
}
