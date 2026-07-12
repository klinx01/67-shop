import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { PricePipe } from "../../pipes/price-format.price";
import { MessageService } from '../services/message.service';
import { LoadingService } from '../services/loading.service';
import { finalize, tap, timer } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [PricePipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  cartService: CartService = inject(CartService);
  messageService: MessageService = inject(MessageService);
  loadingService: LoadingService = inject(LoadingService);

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

  checkout(): void {
    this.loadingService.show();

    timer(2000)
      .pipe(
        tap(() => {
          this.cartService.clearCart();
          this.messageService.showMessage('Payment successful!');
        }),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe();
  }
  
}
