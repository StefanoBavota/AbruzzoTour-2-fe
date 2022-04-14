import { IAllResponse, IMappedPath } from "../../home/interfaces/path.interface";

export interface ITravelPath extends IMappedPath{
  rating: number;
}

export type ITravelResponse = IAllResponse<ITravelPath>;
