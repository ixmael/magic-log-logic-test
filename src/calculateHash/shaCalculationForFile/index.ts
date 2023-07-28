import fs from 'fs/promises';

import shaCalculationForContent from '../shaCalculationForContent';

/**
 * Determines the sha1 hash for the given content
 * @param filename the file path
 * @returns a string that represents the hash
 */
export const shaCalculationForFile: (filename: string) => Promise<string> = async (filename: string): Promise<string> => {
  const content: string = await fs.readFile(filename, { encoding: 'utf8' });
  const hash = await shaCalculationForContent(content);

  return hash;
};

export default shaCalculationForFile;
