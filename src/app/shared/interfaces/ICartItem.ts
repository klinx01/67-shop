import { IProduct } from '../../product-catalog/interfaces/IProduct';

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
