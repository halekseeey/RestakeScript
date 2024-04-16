"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_DECRYPTED = exports.DECRYPT_PASSWORD = exports.REF_CODE = exports.DEPOZIT_CONTRACT_ADDRESS = exports.CONTRACT_ADDRESS = exports.SHUFFLE_WALLET = exports.RPC_URLS = exports.DELAY = exports.ETH_AMOUNT = void 0;
//диапозон в эфире
exports.ETH_AMOUNT = { MIN: 1, MAX: 1.0 };
//диапозон для задержки между транзакциями (ms)
exports.DELAY = { MIN: 30, MAX: 60 };
exports.RPC_URLS = [
    "https://arb1.arbitrum.io/rpc",
    "https://arb1.arbitrum.io/rpc3",
    "http://localhost:85451",
];
exports.SHUFFLE_WALLET = false; //необходимо ли перемешивать
exports.CONTRACT_ADDRESS = "0x399f22ae52a18382a67542b3de9bed52b7b9a4ad";
exports.DEPOZIT_CONTRACT_ADDRESS = "0x2416092f143378750bb29b79eD961ab195CcEea5";
exports.REF_CODE = "rC1pA";
exports.DECRYPT_PASSWORD = "12345"; // ПАРОЛЬ от кошельков
exports.IS_DECRYPTED = true; //нужно ли дешифровать
//# sourceMappingURL=config.const.js.map