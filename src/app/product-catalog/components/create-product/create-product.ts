import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import  {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ProductApiService } from '../../services/product-api.service';
import { ProductService } from '../../services/product.service';
import { INewProduct } from '../../interfaces/INewProduct';

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
  productApiService: ProductApiService = inject(ProductApiService);
  productService: ProductService = inject(ProductService);

  createProductForm = this.fb.group({
    title: ['', [Validators.minLength(4), Validators.maxLength(67), Validators.required]],
    category: ['', [Validators.minLength(4), Validators.maxLength(20), Validators.required]],
    description: ['', [Validators.minLength(4), Validators.maxLength(500), Validators.required]],
    price: ['', [Validators.min(1), Validators.required]]
  })

  onSubmit(): void {
    if (this.createProductForm.invalid) {
      return
    }

    const formValue: INewProduct = this.createProductForm.value as INewProduct;
    this.productService.addProduct(formValue);
    this.router.navigate([''])
  }

}