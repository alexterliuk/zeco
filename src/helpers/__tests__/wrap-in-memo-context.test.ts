import wrapInMemoContext from '../wrap-in-memo-context';

describe('wrapInMemoContext', () => {
  it(
    '1. let func = (id, data) => data; func = wrapInMemoContext(func); \n' +
      "2. func('cars', cars) - if cache.cars return it, otherwise add cars to cache and return cars",
    () => {
      let cars = ['subaru', 'audi', 'cadillac'];
      let getCars = (id: string, data: any) => data;
      let result = getCars('cars', cars);

      expect(result).toEqual(['subaru', 'audi', 'cadillac']);

      cars = ['saab', 'seat'];
      result = getCars('cars', cars);
      expect(result).toEqual(['saab', 'seat']);

      getCars = wrapInMemoContext(getCars);

      result = getCars('cars', cars);
      expect(result).toEqual(['saab', 'seat']);

      cars.push('bmw');
      result = getCars('cars', cars);
      expect(result).toEqual(['saab', 'seat', 'bmw']);

      // cars replaced with new array
      cars = ['mercedes-benz'];
      result = getCars('cars', cars);
      // new array is not returned
      expect(result).not.toEqual(['mercedes-benz']);
      // because previous cached cars returned
      expect(result).toEqual(['saab', 'seat', 'bmw']);
    }
  );
});
