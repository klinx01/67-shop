import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import  {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
    ],
  templateUrl: './create-product.html',
  styleUrl: './create-product.scss',
})
export class CreateProduct {

  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);

  createProductForm = this.fb.group({
    name: ['', [Validators.minLength(4), Validators.maxLength(67), Validators.required]],
    category: ['', [Validators.minLength(4), Validators.maxLength(20), Validators.required]],
    description: ['', [Validators.minLength(4), Validators.maxLength(500), Validators.required]],
    price: ['', [Validators.min(1), Validators.required]]
  })

  onSubmit(): void {
    if (this.createProductForm.invalid) {
      return
    }

    console.log('созданный товар:',this.createProductForm);
    this.router.navigate([''])
  }

}
