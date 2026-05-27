import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { ProductList } from "../product-list/product-list";

@Component({
  selector: 'app-home-page',
  imports: [ProductList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage { 

  

}
