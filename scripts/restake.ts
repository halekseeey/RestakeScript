import Web3, { TransactionReceipt } from "web3";
import { ETH_AMOUNT } from "../config.const";

type RestakeParams = {
  privateKey: string;
  amountWei: string;
  contractAddress: string;
  contractABI: any;
  depositAddress: string;
  web3: Web3;
};

export async function restake({
  privateKey,
  amountWei,
  contractAddress,
  contractABI,
  depositAddress,
  web3,
}: RestakeParams): Promise<TransactionReceipt> {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  const balance = await web3.eth.getBalance(account.address);

  //переходим к след если баланс аккаунта не проходит лимит
  if (balance < BigInt(amountWei)) {
    throw `Restake skiped for privateKey ${account.address} becuse not enough money`;
  }
  // web3.eth.accounts.wallet.add(account);

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  try {
    const restakeCall = await contract.methods.deposit(
      depositAddress,
      amountWei
    );
    const restakeGas = await restakeCall.estimateGas({
      from: account.address,
      value: amountWei,
    });

    const tx = {
      from: account.address,
      to: contractAddress,
      value: amountWei,
      gas: restakeGas.toString(),
      gasPrice: (await web3.eth.getGasPrice()).toString(),
      data: restakeCall.encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    return await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  } catch (error: any) {
    throw error;
  }
}

type AttemptRestakeType = RestakeParams & {
  rpcUrls: string[];
  currentRpcIndex: number;
};

export const attemptRestake = async ({
  rpcUrls,
  currentRpcIndex = 0,
  privateKey,
  amountWei,
  contractAddress,
  contractABI,
  depositAddress,
  web3,
}: AttemptRestakeType): Promise<TransactionReceipt> => {
  web3.setProvider(new Web3.providers.HttpProvider(rpcUrls[currentRpcIndex]));
  try {
    const receipt: TransactionReceipt = await restake({
      privateKey,
      amountWei,
      contractAddress,
      contractABI,
      depositAddress,
      web3,
    });
    return receipt;
  } catch (error) {
    if (currentRpcIndex < rpcUrls.length - 1) {
      // Переходим к следующему RPC URL и повторяем попытку
      return await attemptRestake({
        rpcUrls,
        currentRpcIndex: currentRpcIndex + 1,
        privateKey,
        amountWei,
        contractAddress,
        contractABI,
        depositAddress,
        web3,
      });
    } else {
      throw error;
    }
  }
};
