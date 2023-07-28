import { assert } from 'chai';

import shaCalculationForContent from '../';

describe('generate the conten\'s hash', () => {
  it('The content is empty', async () => {
    const contentEmpty: string = '';
    const contentsHash = await shaCalculationForContent(contentEmpty);
    assert.equal(contentsHash, 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
  });

  it('The content is simple', async () => {
    const contentEmpty: string = 'a simple content';
    const contentsHash = await shaCalculationForContent(contentEmpty);
    assert.equal(contentsHash, '34f3fb8ae7684215e9c8bd7eff2ced51531ada8e');
  });

  it('The content has metacharacteres', async () => {
    const contentEmpty: string = 'a\tb';
    const contentsHash = await shaCalculationForContent(contentEmpty);
    assert.equal(contentsHash, '89df1bfd2d7396f9661d8bc1e24ba7e05afc67b4');
  });

  it('The content has a space', async () => {
    const contentEmpty: string = 'a b';
    const contentsHash = await shaCalculationForContent(contentEmpty);
    assert.notEqual(contentsHash, '89df1bfd2d7396f9661d8bc1e24ba7e05afc67b4');
  });
});
