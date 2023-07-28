import crypto from 'crypto';

/**
 * Determines the sha1 hash for the given content
 * @param content the content
 * @returns a string that represents the hash
 */
const shaCalculationForContent: (content: string) => Promise<string> = async (content: string): Promise<string> => {
  const shaText: string = await crypto
    .createHash('sha1')
    .update(content)
    .digest('hex');

  return shaText;
};

export default shaCalculationForContent;
