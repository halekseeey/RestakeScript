import { importPrivateKeys } from "./helpers/accsess.helper";
import { attemptRestake } from "./scripts/restake";
import Web3 from "web3";

import {
  CONTRACT_ADDRESS,
  RPC_URLS,
  SHUFFLE_WALLET,
  DELAY,
  ETH_AMOUNT,
  DECRYPT_PASSWORD,
  IS_DECRYPTED,
  DEPOSIT_CONTRACT_ADDRESS,
} from "./config.const";
import {
  checkPrivateKeysValidity,
  checkRanges,
  getAbiByRelativePath,
  getRandomAmount,
  getRandomDelay,
  shuffleArray,
  sleep,
} from "./helpers/general.helper";
import { decryptPrivateKey } from "./helpers/decrypt.helper";

const web3: Web3 = new Web3(new Web3.providers.HttpProvider(RPC_URLS[0]));

async function main(): Promise<void> {
  if (!checkRanges(ETH_AMOUNT.MIN, ETH_AMOUNT.MAX)) {
    console.log(`Invalid ETH_AMOUNT\n`);
    return;
  }

  if (!checkRanges(DELAY.MIN, DELAY.MAX)) {
    console.log(`Invalid DELAY\n`);
    return;
  }

  let privateKeys: string[] = await importPrivateKeys();
  if (privateKeys.length === 0) {
    console.log("No wallets found\n");
    return;
  }
  privateKeys = checkPrivateKeysValidity(
    privateKeys,
    web3,
    DECRYPT_PASSWORD,
    IS_DECRYPTED
  );

  if (SHUFFLE_WALLET) {
    //перемешиваем кошельки
    privateKeys = shuffleArray(privateKeys);
  }

  if (IS_DECRYPTED) {
    //дешифруем при необходимости
    privateKeys = privateKeys.map((key) =>
      decryptPrivateKey(key, DECRYPT_PASSWORD)
    );
  }

  for (const privateKey of privateKeys) {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);

    const amountWei: string = getRandomAmount(
      web3,
      ETH_AMOUNT.MIN,
      ETH_AMOUNT.MAX
    );

    const delay = getRandomDelay(DELAY.MIN, DELAY.MAX);

    try {
      const receipt = await attemptRestake({
        rpcUrls: RPC_URLS,
        currentRpcIndex: 0,
        privateKey: privateKey,
        amountWei,
        contractAddress: CONTRACT_ADDRESS,
        contractABI: getAbiByRelativePath("abi/abi.json"),
        depositAddress: DEPOSIT_CONTRACT_ADDRESS,
        web3,
      });
      console.log(
        `Transaction successful for account ${account.address}
      hash: ${receipt.transactionHash}
      amount: ${amountWei} Wei
      delay: ${delay}\n`
      );
    } catch (error) {
      console.log(
        `Restake ultimately failed for account ${account.address} with amount ${amountWei}: ${error}\n`
      );
    }
    await sleep(delay);
    console.log(`${delay} ms delay is over\n`);
  }
}

main().catch(console.error);
