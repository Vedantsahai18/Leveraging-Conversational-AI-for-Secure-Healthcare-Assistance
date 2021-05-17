"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRecord = exports.getAll = exports.getFilteredRecords = void 0;
const ehr_js_1 = require("../utils/ehr.js");
const services_1 = require("../services");
const user_models_1 = __importDefault(require("../models/user.models"));
const filteration_js_1 = require("../utils/filteration.js");
const getFilteredRecords = async (req, res) => {
    const { username } = req.body;
    const query = req.body;
    const records = await user_models_1.default.getRecords(username);
    const filtered = filteration_js_1.filterRecords(records, query);
    return res.json(filtered);
};
exports.getFilteredRecords = getFilteredRecords;
const getAll = async (req, res) => {
    const { username } = req.body;
    const records = await user_models_1.default.getRecords(username);
    return res.json(records);
};
exports.getAll = getAll;
const addRecord = async (req, res) => {
    const token = req.body.token;
    const asset = req.body.asset;
    const clientVault = await services_1.vaultService.vaultFromToken(token);
    const bigchainPrivateKey = await services_1.vaultService.read(clientVault, 'bigchainPrivateKey');
    const bigchainPublicKey = await services_1.vaultService.read(clientVault, 'bigchainPublicKey');
    const secretKey = await services_1.vaultService.read(clientVault, 'secretKey');
    try {
        const tx = await ehr_js_1.createRecord(asset, asset.username, asset.file, bigchainPublicKey, bigchainPrivateKey, secretKey, 'rasa');
        return res.json(tx.id);
    }
    catch (err) {
        console.error(err);
        return res.json('error');
    }
};
exports.addRecord = addRecord;
//# sourceMappingURL=chatbot.controller.js.map