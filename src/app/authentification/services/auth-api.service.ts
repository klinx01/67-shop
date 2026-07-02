import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogin } from '../interfaces/ILogin';
import { Observable } from 'rxjs';
import { IToken } from '../interfaces/IToken';
import { IAuthUser } from '../interfaces/IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  http: HttpClient = inject(HttpClient);

  signIn(userData: ILogin): Observable<IToken> {
    return this.http.post<IToken>('https://dummyjson.com/auth/login', userData);
  }

  getCurrentUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>('https://dummyjson.com/auth/me');
  }

  refreshToken(tokens: IToken): Observable<IToken> {
    return this.http.post<IToken>('https://dummyjson.com/auth/refresh', { refreshToken: tokens.refreshToken })
  }

}