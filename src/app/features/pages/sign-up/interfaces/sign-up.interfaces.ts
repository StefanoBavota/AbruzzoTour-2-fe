export interface IUser {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface IResponseSignUp {
  success: boolean;
  data: IUser;
}

export interface IResponseUpdateUser {
  success: boolean;
  message: string;
}

export interface IResponseCkeckEmail {
  success: boolean;
  message: string;
}

