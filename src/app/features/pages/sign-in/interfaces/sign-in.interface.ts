export interface ILoginUser {
  email: string;
  password: string;
}

export interface IResponseLogin {
  success: boolean;
  message?: string;
  token: string;
}
