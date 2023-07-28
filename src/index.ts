import { exit } from 'process';

import * as dotenv from 'dotenv';

import { requestToBackend } from './requestToBackend';
import { filterKeysWithAgeEqualTo } from './analyzeData';
import { storeKeysInFile } from './storeAnalize';
import { shaCalculationForContent } from './calculateHash';

dotenv.config();

/**
 * Execute the analize logic test
 */
export const main = async () => {
  // Validate the parameters required
  const backendURLText: string | null = process.env.BACKEND_URL || null;
  if (!backendURLText) {
    throw new Error('invalid backend url');
  }
  const backendURL = backendURLText;

  const ageFilterText: string | null = process.env.FILTER_AGE || null;
  if (!ageFilterText) {
    throw new Error('invalid filter age');
  }
  const ageFilter: number = parseInt(ageFilterText, 10);

  const filePath: string | null = process.env.FILE_PATH || null;
  if (!filePath) {
    throw new Error('invalid filepath');
  }
  const filenamePath = filePath;


  // The analyze begins

  // Get data from the backend
  const data: Map<string, number> = await requestToBackend(backendURL);

  // Analyze data
  const filterefKeys = filterKeysWithAgeEqualTo(data, ageFilter);

  // Store the filtered keys
  const content = await storeKeysInFile(filterefKeys, filenamePath);

  // Calculate the hash
  const hashContent = await shaCalculationForContent(content);

  console.log(hashContent);
};

(async () => {
  await main();

  exit(0);
})()
  .catch(e => {
    console.error('e', e);
    exit(100);
  });
