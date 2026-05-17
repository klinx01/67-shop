import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCard } from './components/product-card/product-card';
import { products } from './data/mockProducts';
import { IProduct } from './interface/IProduct';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, ProductCard],
  imports: [ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title: WritableSignal<string> = signal('67-shop');

  protected readonly productsData: IProduct[] = products;

  handleAddToCart(productId: number): void {
    console.log(`Товар с ID ${productId} добавлен в корзину`);
  }

}
