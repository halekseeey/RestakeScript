"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_DECRYPTED = exports.DECRYPT_PASSWORD = exports.REF_CODE = exports.CONTRACT_ADDRESS = exports.SHUFFLE_WALLET = exports.RPC_URLS = exports.DELAY = exports.ETH_AMOUNT = void 0;
//диапозон в эфире
exports.ETH_AMOUNT = { MIN: 0.1, MAX: 1.0 };
//диапозон для задержки между транзакциями (ms)
exports.DELAY = { MIN: 30, MAX: 60 };
exports.RPC_URLS = [
    "http://localhost:3000/",
    "https://arb1.arbitrum.io/rpc2",
    "https://arb1.arbitrum.io/rpc3",
];
exports.SHUFFLE_WALLET = true; //необходимо ли перемешивать
exports.CONTRACT_ADDRESS = "0x399f22ae52a18382a67542b3de9bed52b7b9a4ad";
exports.REF_CODE = "rC1pA";
exports.DECRYPT_PASSWORD = "12345"; // ПАРОЛЬ от кошельков
exports.IS_DECRYPTED = false; //нужно ли дешифровать
//# sourceMappingURL=config.const.js.map