import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { IProduct } from '../../interface/IProduct';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product: InputSignal<IProduct> = input.required<IProduct>();

  addToCart: OutputEmitterRef<number> = output<number>();

  onAddToCart(): void {
    const productId: number = this.product().id;
    this.addToCart.emit(productId);
  }

}
