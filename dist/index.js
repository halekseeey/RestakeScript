"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var accsess_helper_1 = require("./helpers/accsess.helper");
var restake_1 = require("./scripts/restake");
var web3_1 = __importDefault(require("web3"));
var config_const_1 = require("./config.const");
var general_helper_1 = require("./helpers/general.helper");
var decrypt_helper_1 = require("./helpers/decrypt.helper");
var web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(config_const_1.RPC_URLS[0]));
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var privateKeys, _i, privateKeys_1, privateKey, account, balance, amountWei, delay, receipt, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, general_helper_1.checkRanges)(config_const_1.ETH_AMOUNT.MIN, config_const_1.ETH_AMOUNT.MAX)) {
                        console.log("Invalid ETH_AMOUNT\n");
                        return [2 /*return*/];
                    }
                    if (!(0, general_helper_1.checkRanges)(config_const_1.DELAY.MIN, config_const_1.DELAY.MAX)) {
                        console.log("Invalid DELAY\n");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, accsess_helper_1.importPrivateKeys)()];
                case 1:
                    privateKeys = _a.sent();
                    if (privateKeys.length === 0) {
                        console.log("No wallets found\n");
                        return [2 /*return*/];
                    }
                    privateKeys = (0, general_helper_1.checkPrivateKeysValidity)(privateKeys, web3, config_const_1.DECRYPT_PASSWORD, config_const_1.IS_DECRYPTED);
                    if (config_const_1.SHUFFLE_WALLET) {
                        //перемешиваем кошельки
                        privateKeys = (0, general_helper_1.shuffleArray)(privateKeys);
                    }
                    if (config_const_1.IS_DECRYPTED) {
                        //дешифруем при необходимости
                        privateKeys = privateKeys.map(function (key) {
                            return (0, decrypt_helper_1.decryptPrivateKey)(key, config_const_1.DECRYPT_PASSWORD);
                        });
                    }
                    _i = 0, privateKeys_1 = privateKeys;
                    _a.label = 2;
                case 2:
                    if (!(_i < privateKeys_1.length)) return [3 /*break*/, 10];
                    privateKey = privateKeys_1[_i];
                    account = web3.eth.accounts.privateKeyToAccount(privateKey);
                    return [4 /*yield*/, web3.eth.getBalance(account.address)];
                case 3:
                    balance = _a.sent();
                    //переходим к след если баланс аккаунта не проходит лимит
                    if (balance < config_const_1.ETH_AMOUNT.MAX) {
                        console.log("Restake skiped for privateKey ".concat(account.address, " becuse not enough money. Balance: ").concat(balance, "\n"));
                        return [3 /*break*/, 9];
                    }
                    amountWei = (0, general_helper_1.getRandomAmount)(web3, config_const_1.ETH_AMOUNT.MIN, config_const_1.ETH_AMOUNT.MAX);
                    delay = (0, general_helper_1.getRandomDelay)(config_const_1.DELAY.MIN, config_const_1.DELAY.MAX);
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, (0, restake_1.attemptRestake)({
                            rpcUrls: config_const_1.RPC_URLS,
                            currentRpcIndex: 0,
                            privateKey: privateKey,
                            amountWei: amountWei,
                            contractAddress: config_const_1.CONTRACT_ADDRESS,
                            contractABI: (0, general_helper_1.getAbiByRelativePath)("abi/abi.json"),
                            refCode: config_const_1.REF_CODE,
                            web3: web3,
                        })];
                case 5:
                    receipt = _a.sent();
                    console.log("Transaction successful for account ".concat(account.address, "\n      hash: ").concat(receipt.transactionHash, "\n      amount: ").concat(amountWei, " Wei\n      delay: ").concat(delay, "\n"));
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log("Restake ultimately failed for account ".concat(account.address, " with amount ").concat(amountWei, ": ").concat(error_1, "\n"));
                    return [3 /*break*/, 7];
                case 7: return [4 /*yield*/, (0, general_helper_1.sleep)(delay)];
                case 8:
                    _a.sent();
                    console.log("".concat(delay, " ms delay is over\n"));
                    _a.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 2];
                case 10: return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
//# sourceMappingURL=index.js.map