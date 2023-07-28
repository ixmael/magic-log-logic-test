import fs from 'fs/promises';

/**
 * Store the strings in the given array to the file with the given filename path
 * @param keys an array with strings items
 * @param filename the path to store the file
 * @returns the content of the file
 */
const storeKeysInFile: (keys: Array<string>, filename: string) => Promise<string> = async (keys: Array<string>, filename: string): Promise<string> => {
  // Prepare the content
  const contentForTheFile = `${keys.join('\n')}\n`; // add a new line to the end

  // Save the content to the file
  await fs.writeFile(filename, contentForTheFile, { encoding: 'utf-8' });

  // Return the content
  return contentForTheFile;
};

export default storeKeysInFile;
