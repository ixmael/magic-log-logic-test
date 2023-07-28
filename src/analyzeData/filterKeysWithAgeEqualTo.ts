/**
 * Filter the IDs of the data that has the provided age
 * @param data the key-age map
 * @param number the age to filter
 * @returns an array with the IDs that has the age
 */
const filterKeysWithAgeEqualTo: (data: Map<string, number>, age: number) => Array<string> = (data: Map<string, number>, age: number): Array<string> => {
  let keys: Array<string> = new Array<string>();

  // Filter the IDs
  for (let [key, itemAge] of data) {
    if (itemAge === age) {
      keys.push(key);
    }
  }

  return keys;
};

export default filterKeysWithAgeEqualTo;
