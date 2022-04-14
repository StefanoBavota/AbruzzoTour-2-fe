import { Injectable } from '@angular/core';
import { IUser } from '../sign-up/interfaces/sign-up.interfaces';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getCredentials() {
    return this.getDecodedAccessToken(localStorage.getItem('jwt'));
  }

  getDecodedAccessToken(token: string): IUser {
    try {
      return jwt_decode<any>(token).result;
    }
    catch (Error) {
      return null;
    }
  }
}
