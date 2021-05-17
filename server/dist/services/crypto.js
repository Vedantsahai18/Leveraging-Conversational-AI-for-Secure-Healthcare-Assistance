"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = exports.decryptRSA = exports.encryptRSA = exports.generateRSAKeys = exports.hash = exports.decryptFile = exports.decrypt = exports.encrypt = exports.generateIV = exports.createSecretKey = void 0;
const crypto_1 = __importDefault(require("crypto"));
const createSecretKey = () => {
    return crypto_1.default.randomBytes(32).toString('hex').slice(0, 32);
};
exports.createSecretKey = createSecretKey;
const generateIV = () => {
    return crypto_1.default.randomBytes(16).toString('hex').slice(0, 16);
};
exports.generateIV = generateIV;
const encrypt = (text, key = 'd6F3Efeq') => {
    let cipher = crypto_1.default.createCipher('aes-256-cbc', key);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};
exports.encrypt = encrypt;
const decrypt = (text = '', key = 'd6F3Efeq') => {
    let decipher = crypto_1.default.createDecipher('aes-256-cbc', key);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};
exports.decrypt = decrypt;
const decryptFile = (text, key = 'd6F3Efeq') => {
    const buffer = Buffer.from(text, 'hex');
    const decipher = crypto_1.default.createDecipher('aes-256-cbc', key);
    return Buffer.concat([decipher.update(buffer), decipher.final()]);
};
exports.decryptFile = decryptFile;
const hash = (text) => {
    return crypto_1.default.createHash('sha1').update(JSON.stringify(text)).digest('hex');
};
exports.hash = hash;
const generateRSAKeys = () => {
    const { privateKey, publicKey } = crypto_1.default.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: ''
        }
    });
    return {
        privateKey: privateKey,
        publicKey: publicKey
    };
};
exports.generateRSAKeys = generateRSAKeys;
const encryptRSA = (data, publicKey) => {
    const buffer = Buffer.from(data, 'utf8');
    const encrypted = crypto_1.default.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
};
exports.encryptRSA = encryptRSA;
const decryptRSA = (data, privateKey) => {
    const buffer = Buffer.from(data, 'base64');
    const decrypted = crypto_1.default.privateDecrypt({
        key: privateKey.toString(),
        passphrase: ''
    }, buffer);
    return decrypted.toString('utf8');
};
exports.decryptRSA = decryptRSA;
const generateCode = () => {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};
exports.generateCode = generateCode;
//# sourceMappingURL=crypto.js.map