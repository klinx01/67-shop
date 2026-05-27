import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly _isLoggedIn: WritableSignal<boolean> = signal<boolean>(false);

  public readonly isLoggedIn: Signal<boolean> = this._isLoggedIn.asReadonly();

  public login(): void {
    this._isLoggedIn.set(true);
  }

  public logout(): void {
    this._isLoggedIn.set(false);
  }

}
