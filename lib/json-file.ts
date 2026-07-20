import { readFile, writeFile } from "fs/promises";

export const getFileJSONToArray = async <T>(
  path: string
): Promise<T[]> => {
  const file = await readFile(path, 'utf-8');

  return JSON.parse(file) as T[];
};

export const saveArrayToJSON = async <T>(path: string, data:T[]) => {
  await writeFile(path, JSON.stringify(data));
}