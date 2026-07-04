import { computed, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { ICartItem } from "../../shared/interfaces/ICartItem";
import { IProduct } from "../../product-catalog/interfaces/IProduct";

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly _items: WritableSignal<ICartItem[]> = signal<ICartItem[]>([]);
  readonly items: Signal<ICartItem[]> = this._items.asReadonly();

  private readonly STORAGE_KEY: string = 'cart';

  readonly totalItems: Signal<number> = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice: Signal<number> = computed(() =>
    this._items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const storedCart: string | null = localStorage.getItem(this.STORAGE_KEY);

    if (!storedCart) {
      return;
    }

    const items: ICartItem[] = JSON.parse(storedCart);

    this._items.set(items);
  }

  private saveCart(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._items())
    );
  }

  addToCart(product: IProduct): void {

    const items: ICartItem[] = [...this._items()];

    const existingItem: ICartItem | undefined = items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.push({
        product,
        quantity: 1
      });
    }

    this._items.set(items);
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    const items = this._items().filter(item => item.product.id !== productId);
    this._items.set(items);
    this.saveCart();
  }

  clearCart(): void {
    this._items.set([]);
    this.saveCart();
  }

  increaseQuantity(productId: number): void {
    this._items.update((items: ICartItem[]) =>
      items.map((item: ICartItem) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    this.saveCart();
  }

  decreaseQuantity(productId: number): void {
    this._items.update(items =>
      items
        .map((item: ICartItem) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );

    this.saveCart();
  }

}
