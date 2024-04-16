type Range = {
  MIN: number;
  MAX: number;
};

//диапозон в эфире
export const ETH_AMOUNT: Range = { MIN: 1, MAX: 1.0 };

//диапозон для задержки между транзакциями (ms)
export const DELAY: Range = { MIN: 30, MAX: 60 };

export const RPC_URLS: string[] = [
  "https://arb1.arbitrum.io/rpc",
  "https://arb1.arbitrum.io/rpc3",
  "http://localhost:8545",
];

export const SHUFFLE_WALLET: boolean = false; //необходимо ли перемешивать

export const CONTRACT_ADDRESS: string =
  "0x399f22ae52a18382a67542b3de9bed52b7b9a4ad";

export const DEPOZIT_CONTRACT_ADDRESS: string =
  "0x2416092f143378750bb29b79eD961ab195CcEea5";

export const REF_CODE: string = "rC1pA";

export const DECRYPT_PASSWORD: string = "12345"; // ПАРОЛЬ от кошельков

export const IS_DECRYPTED: boolean = true; //нужно ли дешифровать
