import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductFilter } from "../product-filter/product-filter";

@Component({
  selector: 'app-root',
  imports: [ProductFilter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('67-shop');
}
