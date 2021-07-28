import { FahrenheitToCelsiusPipe } from './fahrenheit-to-celsius.pipe';

describe('FahrenheitToCelsiusPipe', () => {
  it('create an instance', () => {
    const pipe = new FahrenheitToCelsiusPipe();
    expect(pipe).toBeTruthy();
  });
});
