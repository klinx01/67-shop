import { InjectionToken } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';

export const PRODUCTS_DATA = new InjectionToken<IProduct[]>('products.data');
