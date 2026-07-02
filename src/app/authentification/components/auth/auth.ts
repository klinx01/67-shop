import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-auth',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {

  authService: AuthService = inject(AuthService);
  fb: FormBuilder = inject(FormBuilder);

  authForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
  })
  
  onSubmit(): void {
    if (this.authForm.invalid) {
      return
    }

    this.authService.signIn(this.authForm.value);
  }
}
