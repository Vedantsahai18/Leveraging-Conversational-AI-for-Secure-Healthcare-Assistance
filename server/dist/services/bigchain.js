"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTransactions = exports.getTransaction = exports.getMetadata = exports.getAsset = exports.transferAsset = exports.createAsset = exports.createBigchainKeys = void 0;
const bigchaindb_driver_1 = require("bigchaindb-driver");
const easy_bigchain_1 = __importDefault(require("easy-bigchain"));
const config_1 = require("../config");
const conn = new bigchaindb_driver_1.Connection(config_1.BIGCHAIN_URL);
const createBigchainKeys = (email) => {
    return easy_bigchain_1.default.generateKeypair(email);
};
exports.createBigchainKeys = createBigchainKeys;
const createAsset = async (asset, metadata, publicKey, privateKey) => {
    const txCreateAliceSimple = bigchaindb_driver_1.Transaction.makeCreateTransaction(asset, metadata, [bigchaindb_driver_1.Transaction.makeOutput(bigchaindb_driver_1.Transaction.makeEd25519Condition(publicKey))], publicKey);
    const txCreateAliceSimpleSigned = bigchaindb_driver_1.Transaction.signTransaction(txCreateAliceSimple, privateKey);
    const tx = await conn.postTransactionCommit(txCreateAliceSimpleSigned);
    return tx;
};
exports.createAsset = createAsset;
const transferAsset = async (transaction, metadata, publicKey, privateKey) => {
    let txTransferBob = bigchaindb_driver_1.Transaction.makeTransferTransaction([{ tx: transaction, output_index: 0 }], [bigchaindb_driver_1.Transaction.makeOutput(bigchaindb_driver_1.Transaction.makeEd25519Condition(publicKey))], metadata);
    const txTransferBobSigned = bigchaindb_driver_1.Transaction.signTransaction(txTransferBob, privateKey);
    const transfer = await conn.postTransactionCommit(txTransferBobSigned);
    return transfer;
};
exports.transferAsset = transferAsset;
const getAsset = async (query) => {
    return await conn.searchAssets(query);
};
exports.getAsset = getAsset;
const getMetadata = async (query) => {
    return await conn.searchMetadata(query);
};
exports.getMetadata = getMetadata;
const getTransaction = async (id) => {
    return await conn.getTransaction(id);
};
exports.getTransaction = getTransaction;
const listTransactions = async (id) => {
    return await conn.listTransactions(id);
};
exports.listTransactions = listTransactions;
//# sourceMappingURL=bigchain.js.map