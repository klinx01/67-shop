import { PricePipe } from './../../../pipes/price-format.price';
import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  selector: 'app-product-card',
  imports: [PricePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard {

  product: InputSignal<IProduct> = input.required<IProduct>();

  addToCart: OutputEmitterRef<IProduct> = output<IProduct>();

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }
}
