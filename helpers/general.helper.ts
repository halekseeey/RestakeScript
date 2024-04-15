import { randomInt } from "crypto";
import Web3, { AbiItem } from "web3";
import { decryptPrivateKey } from "./decrypt.helper";
import * as fs from "fs";
import * as path from "path";

export function getRandomAmount(
  web3: Web3,
  minEth: number,
  maxEth: number
): string {
  const amountEth = minEth + Math.random() * (maxEth - minEth);
  return web3.utils.toWei(amountEth.toString(), "ether");
}

export function getRandomDelay(minDelay: number, maxDelay: number): number {
  return randomInt(minDelay, maxDelay);
}

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const checkPrivateKeysValidity = (
  privateKeys: string[],
  web3: Web3,
  password: string,
  isDecrypted: boolean
): string[] => {
  return privateKeys.filter((key) => {
    try {
      // дешифруем при необходимости
      const decryptKey = isDecrypted ? decryptPrivateKey(key, password) : key;
      return web3.eth.accounts.privateKeyToAccount(decryptKey);
    } catch (error) {
      console.error(`Invalid private key: ${key}. Error: ${error}`);
      return false;
    }
  });
};

export const checkRanges = (min: number, max: number): boolean => {
  return typeof min === "number" && typeof max === "number" && min <= max;
};

export const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getAbiByRelativePath = (relativePath: string): AbiItem[] => {
  return JSON.parse(
    fs.readFileSync(path.join(path.resolve(), relativePath), "utf-8")
  );
};
