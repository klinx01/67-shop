import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { PricePipe } from "../../../pipes/price-format.price";

@Component({
  selector: 'app-cart',
  imports: [PricePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  cartService: CartService = inject(CartService);

  remove(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  increase(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decrease(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

}
