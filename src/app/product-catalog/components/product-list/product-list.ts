import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { ProductFilter } from "../product-filter/product-filter";
import { ProductService } from '../../services/product.service';
import { ProductCard } from "../product-card/product-card";
import { Router } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CartService } from '../../../core/services/cart.service';
import { PricePipe } from "../../../pipes/price-format.price";

@Component({
  selector: 'app-product-list',
  imports: [ProductFilter, ProductCard, MatToolbarModule, MatButtonModule, MatIconModule, PricePipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList {

  productService: ProductService = inject(ProductService);
  router: Router = inject(Router);
  cartService: CartService = inject(CartService);

  searchQuery: WritableSignal<string> = signal<string>('');
  QuantityProducts: Signal<number> = this.productService.productsLength;

  filteredProducts: Signal<IProduct[]> = computed<IProduct[]>(() => {
    const query: string = this.searchQuery().toLowerCase().trim();

    if (!query) {
      return this.productService.productsData();
    } else {
        return this.productService.productsData().filter((p: IProduct) =>
          p.title.toLowerCase().includes(query)
        );
      }});


  onFilterChange(value: string): void {
    this.searchQuery.set(value);
  }

  handleAddToCart(product: IProduct): void {
    this.cartService.addToCart(product);

    console.log(this.cartService.items());
  }

  redirectToCreateProduct(): void {
    this.router.navigate(['/create-product']);
  }

}
