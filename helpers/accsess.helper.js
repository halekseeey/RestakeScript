import fs from "fs";
import path from "path";
import readline from "readline";
import stream from "stream";

const __dirname = path.resolve();

export const importPrivateKeys = async () => {
  const privateKeys = [];
  const instream = fs.createReadStream(path.join(__dirname, "./wallets.txt"));
  const outstream = new stream.Stream();
  const rl = readline.createInterface({ input: instream, output: outstream });

  for await (const line of rl) {
    privateKeys.push(line);
  }

  return privateKeys;
};
