import { assert } from 'chai';

import filterKeysWithAgeEqualTo from '../filterKeysWithAgeEqualTo';

describe('filter keys with age equal to', () => {
  it('The data is empty', () => {
    const dataEmpty: Map<string, number> = new Map<string, number>();
    const age: number = 0;

    const listKeys = filterKeysWithAgeEqualTo(dataEmpty, age);

    assert.equal(listKeys.length, 0);
  });

  it('The data has an item without the required age', () => {
    const data: Map<string, number> = new Map<string, number>();
    const age: number = 5;

    data.set('a', 15);

    const listKeys = filterKeysWithAgeEqualTo(data, age);

    assert.equal(listKeys.length, 0);
  });

  it('The data has items without the required age', () => {
    const data: Map<string, number> = new Map<string, number>();
    const age: number = 15;

    data.set('a', 5);
    data.set('b', 10);

    const listKeys = filterKeysWithAgeEqualTo(data, age);

    assert.equal(listKeys.length, 0);
  });

  it('The data has an item with the required age', () => {
    const data: Map<string, number> = new Map<string, number>();
    const age: number = 5;

    data.set('a', 5);

    const listKeys = filterKeysWithAgeEqualTo(data, age);

    assert.equal(listKeys.length, 1);
    assert.equal(listKeys[0], 'a');
  });

  it('The data has items with the required age', () => {
    const data: Map<string, number> = new Map<string, number>();
    const age: number = 5;

    data.set('a', 5);
    data.set('b', 5);
    data.set('c', 5);

    const listKeys = filterKeysWithAgeEqualTo(data, age);

    assert.equal(listKeys.length, 3);
    assert.equal(listKeys[0], 'a');
    assert.equal(listKeys[1], 'b');
    assert.equal(listKeys[2], 'c');
  });

  it('The data has some items with the required age', () => {
    const data: Map<string, number> = new Map<string, number>();
    const age: number = 5;

    data.set('a', 5);
    data.set('b', 15);
    data.set('c', 5);

    const listKeys = filterKeysWithAgeEqualTo(data, age);

    assert.equal(listKeys.length, 2);
    assert.equal(listKeys[0], 'a');
    assert.equal(listKeys[1], 'c');
  });
});
