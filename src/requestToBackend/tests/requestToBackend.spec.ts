import { resolve } from 'path';

import { assert } from 'chai';

import http from 'http';
import mockserver from 'mockserver';

import requestToBackend from '../requestToBackend';

// Prepare the mock server
let mockServer: any = null;

// import { DataType } from '../../types';

describe('fetch data from the backend', () => {
  // Start the mockserver
  before((done) => {
    mockServer = http
      .createServer(mockserver(resolve('./src/requestToBackend/tests/mocks')))
      .listen(9001, () => {
        done();
      });
  });

  after(done => {
    if (mockServer) {
      mockServer.close(done);
    }
  });

  it('The url is empty', async () => {
    const url: string = '';

    try {
      await requestToBackend(url);

      assert.isFalse(true); // this has not to reach
    } catch (err: any) {
      assert.isTrue(err instanceof TypeError);
    }
  });

  it('The url is not reachable', async () => {
    const url: string = 'http://localhost:9001/unreachable';

    try {
      await requestToBackend(url);

      assert.notExists(true); // this has not to reach
    } catch (err: any) {
      assert.equal(err instanceof Error, true);
    }
  });

  it('The backend return an error', async () => {
    const url: string = 'http://localhost:9001/errors/';

    try {
      await requestToBackend(url);

      assert.notExists(true); // this has not to reach
    } catch (err: any) {
      assert.equal(err.toString(), 'Error: error in the response');
    }
  });

  it('The backend return a success statuse but is not 200', async () => {
    const url: string = 'http://localhost:9001/empty';

    try {
      await requestToBackend(url);

      assert.notExists(true); // this has not to reach
    } catch (err: any) {
      assert.equal(err.toString(), 'Error: the response is not valid');
    }
  });

  it('The backend return an empty body', async () => {
    const url: string = 'http://localhost:9001/empty-body';

    try {
      await requestToBackend(url);

      assert.notExists(true); // this has not to reach
    } catch (err: any) {
      assert.equal(err.toString(), 'Error: The content of the response is empty');
    }
  });

  it('The backend return a json with data attribute empty', async () => {
    const url: string = 'http://localhost:9001/empty-data';

    try {
      await requestToBackend(url);

      assert.notExists(true); // this has not to reach
    } catch (err: any) {
      assert.equal(err.toString(), 'Error: Error on data');
    }
  });

  it('The backend return a json with data invalid', async () => {
    const url: string = 'http://localhost:9001/invalid-data';

    try {
      await requestToBackend(url);

      assert.notExists(true); // this has not to reach
    } catch (err: any) {
      assert.equal(err.toString(), 'Error: Error on data');
    }
  });

  it('The data has an invalid value for age', async () => {
    const url: string = 'http://localhost:9001/valid-data-with-invalid-age';

    const data = await requestToBackend(url);
    assert.equal(data.size, 1);
  });

  it('The data is valid', async () => {
    const url: string = 'http://localhost:9001/valid-data';

    const data = await requestToBackend(url);
    assert.equal(data.size, 4);
  });
});
