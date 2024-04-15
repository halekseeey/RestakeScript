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
exports.attemptRestake = exports.restake = void 0;
var web3_1 = __importDefault(require("web3"));
function restake(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var account, contract, restakeCall, restakeGas, tx, signedTx, error_1;
        var _c;
        var privateKey = _b.privateKey, amountWei = _b.amountWei, contractAddress = _b.contractAddress, contractABI = _b.contractABI, refCode = _b.refCode, web3 = _b.web3;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    account = web3.eth.accounts.privateKeyToAccount(privateKey);
                    contract = new web3.eth.Contract(contractABI, contractAddress);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, contract.methods.Deposit(amountWei, refCode)];
                case 2:
                    restakeCall = _d.sent();
                    return [4 /*yield*/, restakeCall.estimateGas({
                            from: account.address,
                            value: amountWei,
                        })];
                case 3:
                    restakeGas = _d.sent();
                    _c = {
                        from: account.address,
                        to: contractAddress,
                        value: amountWei,
                        gas: restakeGas.toString()
                    };
                    return [4 /*yield*/, web3.eth.getGasPrice()];
                case 4:
                    tx = (_c.gasPrice = (_d.sent()).toString(),
                        _c.data = restakeCall.encodeABI(),
                        _c);
                    return [4 /*yield*/, web3.eth.accounts.signTransaction(tx, privateKey)];
                case 5:
                    signedTx = _d.sent();
                    return [4 /*yield*/, web3.eth.sendSignedTransaction(signedTx.rawTransaction)];
                case 6: return [2 /*return*/, _d.sent()];
                case 7:
                    error_1 = _d.sent();
                    throw error_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.restake = restake;
var attemptRestake = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var receipt, error_2;
    var rpcUrls = _b.rpcUrls, _c = _b.currentRpcIndex, currentRpcIndex = _c === void 0 ? 0 : _c, privateKey = _b.privateKey, amountWei = _b.amountWei, contractAddress = _b.contractAddress, contractABI = _b.contractABI, refCode = _b.refCode, web3 = _b.web3;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                web3.setProvider(new web3_1.default.providers.HttpProvider(rpcUrls[currentRpcIndex]));
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 7]);
                return [4 /*yield*/, restake({
                        privateKey: privateKey,
                        amountWei: amountWei,
                        contractAddress: contractAddress,
                        contractABI: contractABI,
                        refCode: refCode,
                        web3: web3,
                    })];
            case 2:
                receipt = _d.sent();
                return [2 /*return*/, receipt];
            case 3:
                error_2 = _d.sent();
                if (!(currentRpcIndex < rpcUrls.length - 1)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, exports.attemptRestake)({
                        rpcUrls: rpcUrls,
                        currentRpcIndex: currentRpcIndex + 1,
                        privateKey: privateKey,
                        amountWei: amountWei,
                        contractAddress: contractAddress,
                        contractABI: contractABI,
                        refCode: refCode,
                        web3: web3,
                    })];
            case 4: 
            // Переходим к следующему RPC URL и повторяем попытку
            return [2 /*return*/, _d.sent()];
            case 5: throw error_2;
            case 6: return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.attemptRestake = attemptRestake;
//# sourceMappingURL=restake.js.map