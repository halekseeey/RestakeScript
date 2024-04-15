import { importPrivateKeys } from "./helpers/accsess.helper";
import { attemptRestake } from "./scripts/restake";
import Web3 from "web3";

import {
  CONTRACT_ADDRESS,
  RPC_URLS,
  SHUFFLE_WALLET,
  DELAY,
  ETH_AMOUNT,
  REF_CODE,
  DECRYPT_PASSWORD,
  IS_DECRYPTED,
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
    const balance = await web3.eth.getBalance(account.address);

    //переходим к след если баланс аккаунта не проходит лимит
    if (balance < ETH_AMOUNT.MAX) {
      console.log(
        `Restake skiped for privateKey ${account.address} becuse not enough money. Balance: ${balance}\n`
      );
      continue;
    }

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
        contractABI: getAbiByRelativePath("./abi/abi.json"),
        refCode: REF_CODE,
        web3,
      });
      console.log(
        `Transaction successful for privateKey ${account.address}\n
      hash: ${receipt.transactionHash}\n
      amount: ${amountWei} Wei
      delay: ${delay}\n`
      );
    } catch (error) {
      console.log(
        `Restake ultimately failed for privateKey ${account.address} with amount ${amountWei}: ${error}\n`
      );
    }
    await sleep(delay);
    console.log(`${delay} ms delay is over\n`);
  }
}

main().catch(console.error);
