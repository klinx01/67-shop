import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(
    value: number | null | undefined,
    currency: string = '$'
  ): string {

    if (value == null) {
      return `0 ${currency}`;
    }

    return `${value.toLocaleString('ru-RU')} ${currency}`;
  }

}
