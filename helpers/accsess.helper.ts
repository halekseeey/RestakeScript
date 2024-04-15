import fs from "fs";
import path from "path";
import readline from "readline";
import { Stream, Writable } from "stream";

const __dirname = path.resolve();

export const importPrivateKeys = async (): Promise<string[]> => {
  const privateKeys: string[] = [];
  const filePath = path.join(__dirname, "./wallets.txt");
  const instream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: instream,
  });

  for await (const line of rl) {
    privateKeys.push(line);
  }

  rl.close();
  return privateKeys;
};
