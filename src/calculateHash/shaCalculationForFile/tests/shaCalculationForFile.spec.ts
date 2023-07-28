import fs from 'fs/promises';
import { resolve } from 'path';

import { assert } from 'chai';

import shaCalculationForFile from '../';

// Prepare the content path
const path = resolve('.tests.shaCalculationForFile');

describe('calculate the sha1 hash of a file', () => {
  // Create the path to work
  before((done) => {
    fs.mkdir(path).then(() => done());
  });

  after((done) => {
    fs.rm(path, { recursive: true, force: true }).then(() => done());
  });

  it('The file not exists', async () => {
    const emptyContentFile = `${path}/notexists.file`;

    try {
      await shaCalculationForFile(emptyContentFile);

      assert.notExists(true); // this has not to reach
    } catch (err: any) {
      assert.equal(err.name, 'Error');
    }
  });

  it('The content of the file is empty', async () => {
    const emptyContentFile = `${path}/empty.content.file`;
    await fs.writeFile(emptyContentFile, '', { encoding: 'utf-8' });

    const fileHash = await shaCalculationForFile(emptyContentFile);
    assert.equal(fileHash, 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
  });

  it('The file content is simple', async () => {
    const simpleContentFile = `${path}/simple.content.file`;
    await fs.writeFile(simpleContentFile, 'a simple content', { encoding: 'utf-8' });
    const fileHash = await shaCalculationForFile(simpleContentFile);

    assert.equal(fileHash, '34f3fb8ae7684215e9c8bd7eff2ced51531ada8e');
  });

  it('The content file has metacharacteres', async () => {
    const content: string = 'a\tb';

    const contentFile = `${path}/metacharacteres.content.file`;
    await fs.writeFile(contentFile, content, { encoding: 'utf-8' });
    const fileHash = await shaCalculationForFile(contentFile);

    assert.equal(fileHash, '89df1bfd2d7396f9661d8bc1e24ba7e05afc67b4');
  });

  it('The content file has a space', async () => {
    const content: string = 'a b';

    const contentFile = `${path}/metacharacteres.content.file`;
    await fs.writeFile(contentFile, content, { encoding: 'utf-8' });
    const fileHash = await shaCalculationForFile(contentFile);

    assert.equal(fileHash, '7dbde93504122a707f849f2c12bdd9de71b41929');
  });
});
