"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPrivateKey = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var getDecryptedBytes = function (_encBase64Pk, _pwd) {
    var salt = crypto_js_1.default.SHA256(_pwd);
    var key = crypto_js_1.default.PBKDF2(_pwd, salt, { keySize: 256 / 32 });
    return crypto_js_1.default.AES.decrypt(_encBase64Pk, key, { mode: crypto_js_1.default.mode.ECB });
};
var decryptPrivateKey = function (_encBase64Pk, _pwd) {
    var decryptedBytes = getDecryptedBytes(_encBase64Pk, _pwd);
    var decryptedHex = decryptedBytes.toString(crypto_js_1.default.enc.Hex);
    if (decryptedHex[0] == decryptedHex[1] && decryptedHex[0] == "0") {
        var decrypt = decryptedHex.substring(0, 1) + "x" + decryptedHex.substring(2);
        return decrypt;
    }
    return decryptedHex;
};
exports.decryptPrivateKey = decryptPrivateKey;
//# sourceMappingURL=decrypt.helper.js.map