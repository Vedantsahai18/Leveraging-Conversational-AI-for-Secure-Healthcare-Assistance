"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rasaCharts = exports.rasaHistory = exports.rasa = exports.view = exports.signUp = void 0;
const services_1 = require("../services");
const user_models_1 = __importDefault(require("../models/user.models"));
const ehr_1 = require("../utils/ehr");
const doctorExclude = ['pass', 're_pass', 'signup'];
const patientExclude = [...doctorExclude, 'location', 'institute', 'specialization'];
const signUp = async (req, res) => {
    const vault = services_1.vaultService.Vault;
    const users = await services_1.vaultService.getUsers(vault);
    if (users.includes(req.body.username) || !req.body.username) {
        return res.render("signup.ejs", { body: req.body, error: "User already exists" });
    }
    try {
        const password = req.body.pass;
        const asset = req.body;
        if (req.body.institute === '') {
            patientExclude.forEach(key => {
                delete asset[key];
            });
        }
        else {
            doctorExclude.forEach(key => {
                delete asset[key];
            });
        }
        const user = await user_models_1.default.createUser(asset, password);
        if (user.user)
            return res.redirect('/login');
    }
    catch (error) {
        console.error(error);
    }
    return res.sendStatus(404);
};
exports.signUp = signUp;
const view = async (req, res) => {
    var _a, _b, _c;
    try {
        const status = String(req.body.status);
        let fileURL = String(req.body.fileURL);
        let decryptedBuffer;
        if (status === 'encrypted') {
            fileURL = services_1.cryptoService.decrypt(fileURL, (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.secrets) === null || _b === void 0 ? void 0 : _b.secretKey);
        }
        const buffer = await services_1.ipfsService.GetFile(fileURL);
        if (req.body.hasOwnProperty('key')) {
            decryptedBuffer = services_1.cryptoService.decryptFile(buffer, req.body.key);
        }
        else {
            decryptedBuffer = services_1.cryptoService.decryptFile(buffer, (_c = req.user) === null || _c === void 0 ? void 0 : _c.secrets.secretKey);
        }
        await services_1.ipfsService.Download(res, decryptedBuffer);
        return fileURL;
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.view = view;
const rasa = async (req, res) => {
    var _a, _b, _c, _d;
    try {
        const sender = String((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username) || 'vortex';
        let message;
        let rasa;
        if (req.file) {
            message = await ehr_1.createIPFSHashFromFileBuffer(req.file.buffer, (_c = req.user) === null || _c === void 0 ? void 0 : _c.secrets.secretKey);
            rasa = await services_1.rasaService.RASARequest(message, sender, (_d = req.user) === null || _d === void 0 ? void 0 : _d.clientToken);
        }
        else {
            message = req.body.message;
            rasa = await services_1.rasaService.RASARequest(message, sender);
        }
        return res.status(200).json(rasa);
    }
    catch (err) {
        console.error('Error: ', err);
        return res.status(500);
    }
};
exports.rasa = rasa;
const rasaHistory = async (req, res) => {
    var _a, _b, _c, _d;
    const username = req.body.rasa;
    try {
        let data = await services_1.rasaService.getRasaHistory(username);
        if (data.length != 0) {
            return res.render('doctor/history.ejs', {
                doc: data,
                name: (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.name
            });
        }
        else {
            return res.render('doctor/history.ejs', {
                doc: [],
                name: (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.name
            });
        }
    }
    catch (err) {
        console.error('Error: ', err);
        return res.status(500);
    }
};
exports.rasaHistory = rasaHistory;
const rasaCharts = async (req, res) => {
    const username = req.body.rasa;
    try {
        const data = await services_1.rasaService.getRASACharts(username);
        return res.json({ data: data });
    }
    catch (err) {
        console.error('Error: ', err);
        return res.status(500);
    }
};
exports.rasaCharts = rasaCharts;
//# sourceMappingURL=common.controller.js.map