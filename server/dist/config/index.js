"use strict";
// const dotenv = require('dotenv');
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPFS = exports.BIGCHAIN_URL = exports.RASA_URL = exports.MONGO_URL = exports.VAULT = exports.JWT_SECRET = exports.SECRET = exports.PORT = void 0;
// dotenv.config();
exports.PORT = Number(process.env.PORT || 5000);
exports.SECRET = String(process.env.SECRET || 'secret_default');
exports.JWT_SECRET = String(process.env.JWT_SECRET);
exports.VAULT = {
    url: String(process.env.VAULT_URL || 'http://localhost:8200'),
    token: String(process.env.VAULT_TOKEN || 'myroot')
};
exports.MONGO_URL = String(process.env.MONGO_URL || 'mongodb://localhost:27017/');
exports.RASA_URL = String(process.env.RASA_URL || 'http://localhost:5005');
exports.BIGCHAIN_URL = String(process.env.BIGCHAIN_URL || 'http://localhost:9984/api/v1/');
exports.IPFS = {
    url: String(process.env.IPFS_URL || 'ipfs.infura.io'),
    port: String('5001')
};
//# sourceMappingURL=index.js.map