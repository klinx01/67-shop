import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  router: Router = inject(Router);
  private readonly _isLoggedIn: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isLoggedIn: Signal<boolean> = this._isLoggedIn.asReadonly();

  public login(): void {
    this.router.navigate(['']);
    this._isLoggedIn.set(true);
  }

  public logout(): void {
    this.router.navigate(['/auth'])
    this._isLoggedIn.set(false);
  }

}
