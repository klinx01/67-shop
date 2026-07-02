import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from '../interfaces/ILogin';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { IToken } from '../interfaces/IToken';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { IAuthUser } from '../interfaces/IAuthUser';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../core/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  router: Router = inject(Router);
  authApiService: AuthApiService = inject(AuthApiService)
  authUserSubject: BehaviorSubject<null | IAuthUser> = new BehaviorSubject<null | IAuthUser>(null);
  authUser$: Observable<null | IAuthUser> = this.authUserSubject.asObservable();
  localStorageService: LocalStorageService = inject(LocalStorageService);
  messageService: MessageService = inject(MessageService);

  signIn(userData: ILogin) {
    this.authApiService.signIn(userData).pipe(
      tap((res: IToken) => {
        const authTokens = {
          accessToken: res.accessToken,
          refreshToken : res.refreshToken
        }
        this.localStorageService.setValue('auth-tokens', authTokens)
      }),
      switchMap(() => { 
        return this.checkAuthStatus();
      }),
      tap(() => this.router.navigate(['']))
    ).subscribe()
  }

  checkAuthStatus(): Observable<IAuthUser | null> {
    const authTokens: IToken | null =  this.localStorageService.getValue('auth-tokens')

    if (authTokens) {
      return this.authApiService.getCurrentUser().pipe(
        tap((res: IAuthUser) => {
          this.authUserSubject.next(res)
        }),
        catchError((err: HttpErrorResponse) => {
          this.authUserSubject.next(null);
          return of(null)
        })
      )
    } else {
      this.authUserSubject.next(null)
      return of(null)
    }
  }

  refreshToken() {
    const tokens: IToken | null = this.localStorageService.getValue('auth-tokens')

    if (!tokens) {
      console.log('dasdas')
      this.router.navigate(['/auth'])
      return throwError((res: HttpErrorResponse) => res);
    } 
    return this.authApiService.refreshToken(tokens).pipe(
      tap((res: IToken) => {
        this.localStorageService.setValue('auth-tokens', res);
      })
    )
  }

  login(): void {
    this.router.navigate(['']);
  }

  logout(): void {
    this.localStorageService.removeValue('auth-tokens')
    this.router.navigate(['/auth'])
  }

}
