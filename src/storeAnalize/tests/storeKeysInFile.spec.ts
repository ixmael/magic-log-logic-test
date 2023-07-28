import fs from 'fs/promises';
import { resolve } from 'path';

import { assert } from 'chai';

import storeKeysInFile from '../storeKeysInFile';

// Prepare the content path
const path = resolve('.tests.storeKeysInFile');

describe('Store content to a file', () => {
  // Create the path to work
  before((done) => {
    fs.mkdir(path).then(() => done());
  });

  after((done) => {
    fs.rm(path, { recursive: true, force: true }).then(() => done());
  });

  it('The path is not accesible', async () => {
    const thePathNotExists = resolve('.tests.storeKeysInFile.notexists/output.txt');

    try {
      await storeKeysInFile(new Array<string>(), thePathNotExists);
    } catch (err: any) {
      assert.equal(err.name, 'Error');
    }
  });

  it('Store an empty array', async () => {
    const filePath = resolve('.tests.storeKeysInFile/output.txt');

    const content = await storeKeysInFile(new Array<string>(), filePath);

    assert.equal(content, '\n');

    const fileContent: string = (await fs.readFile(filePath)).toString();
    assert.equal(fileContent, '\n');
  });

  it('Store an array with only an element', async () => {
    const filePath = resolve('.tests.storeKeysInFile/output.txt');

    const ids: Array<string> = [
      'a',
    ] as Array<string>;
    const content = await storeKeysInFile(ids, filePath);

    assert.equal(content, 'a\n');

    const fileContent: string = (await fs.readFile(filePath)).toString();
    assert.equal(fileContent, 'a\n');
  });

  it('Store an array with three elements', async () => {
    const filePath = resolve('.tests.storeKeysInFile/output.txt');

    const ids: Array<string> = [
      'a',
      'b',
      'c',
    ] as Array<string>;
    const content = await storeKeysInFile(ids, filePath);

    assert.equal(content, 'a\nb\nc\n');

    const fileContent: string = (await fs.readFile(filePath)).toString();
    assert.equal(fileContent, 'a\nb\nc\n');
  });
});
