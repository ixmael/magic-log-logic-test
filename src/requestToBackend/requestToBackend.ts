import fetch, {
  Request,
  Response,
} from 'node-fetch';

import {
  MagicLogBackendResponseType,
} from '../types';


/**
 * Fetch the data from the given url and process the result to generate a key-age map
 * @param url the url to fetch the data
 * @returns a map with the key-age
 */
const requestToBackend: (url: string) => Promise<Map<string, number>> = async (url: string): Promise<Map<string, number>> => {
  const request = new Request(url);

  const response: Response = await fetch(request);

  if (!response.ok) {
    throw new Error('error in the response');
  } else if (response.status !== 200) {
    throw new Error('the response is not valid');
  }

  const text = await response.text();
  if (text === '') {
    throw new Error('The content of the response is empty');
  }
  let responseData: MagicLogBackendResponseType | null = null;
  try {
    responseData = JSON.parse(text) as MagicLogBackendResponseType;
  } catch (err: any) {
    throw new Error('Cannot parse the content to JSON');
  }

  // Validate the response
  if (!(responseData && responseData.hasOwnProperty('data'))) {
    throw new Error('The JSON is not valid');
  }

  // Prepare the raw data
  const rawData = responseData.data;
  const rawDataCleaned = rawData.replace(' ', '').split(','); // Clean an separate data

  // Validate that the raw data has an even numbers of data
  if (rawDataCleaned.length % 2 !== 0) {
    throw new Error('Error on data');
  }

  // The data to store the key-age values
  const data: Map<string, number> = new Map<string, number>();

  // Parse the data to populate the data map
  let currentKey: string = '';
  rawDataCleaned.forEach((strItem: string) => {
    const [key, value] = strItem.trim().split('=');

    switch (key) {
      case 'key':
        currentKey = value;
        break;

      case 'age':
        // Check if this is preceded by a key item
        if (currentKey !== '') {
          const age = parseInt(value, 10);
          if (!isNaN(age)) {
            data.set(currentKey, age);
          }

          currentKey = '';
        }
        break;

      default:
        // If the key is not identificable, restore the current key
        currentKey = '';
    }
  });

  return data;
};

export default requestToBackend;
