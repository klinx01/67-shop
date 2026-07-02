import { PricePipe } from './price-format.price';
describe('PricePipe', () => {
  let pipe: PricePipe;

  beforeEach(() => {
    pipe = new PricePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format price with default currency', () => {
    const result: string = pipe.transform(1000);
    expect(result.replace(/\u00A0/g, ' ')).toBe('1 000 $');
  });

  it('should return 0 with currency when value is null', () => {
    const result: string = pipe.transform(null);
    expect(result).toBe('0 $');
  });

  it('should return 0 with currency when value is undefined', () => {
    const result: string = pipe.transform(undefined);
    expect(result).toBe('0 $');
  });

  it('should format price with custom currency', () => {
    const result: string = pipe.transform(1000, '€');
    expect(result.replace(/\u00A0/g, ' ')).toBe('1 000 €');
  });

  it('should format small numbers correctly', () => {
    const result: string = pipe.transform(50);
    expect(result.replace(/\u00A0/g, ' ')).toBe('50 $');
  });

  it('should format large numbers correctly', () => {
    const result: string = pipe.transform(1000000);
    expect(result.replace(/\u00A0/g, ' ')).toBe('1 000 000 $');
  });

});
