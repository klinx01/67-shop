import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  snackBar: MatSnackBar = inject(MatSnackBar);

  showMessage(message: string): void {
    this.snackBar.open(message, 'Закрыть', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    })
  }

}
