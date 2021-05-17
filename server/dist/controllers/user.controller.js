"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRecord = exports.assetHistory = exports.prescription = exports.uncheck = exports.check = exports.postRevoke = exports.postAccess = exports.getMedicalHistory = exports.getDoctorList = void 0;
const ehr_js_1 = require("../utils/ehr.js");
const services_1 = require("../services");
const user_models_1 = __importDefault(require("../models/user.models"));
const getDoctorList = async (req, res) => {
    var _a;
    try {
        const doctors = (await services_1.bigchainService.getAsset('Doctor')).map(({ data }) => data);
        return res.render('patient/doclist.ejs', { doctors: doctors, name: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.name });
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.getDoctorList = getDoctorList;
const getMedicalHistory = async (req, res) => {
    try {
        if (req.user) {
            const records = await user_models_1.default.getRecords(req.user.user.username);
            return res.render('patient/history.ejs', { records: records, name: req.user.user.name });
        }
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.getMedicalHistory = getMedicalHistory;
const postAccess = async (req, res) => {
    var _a;
    const doctor = req.body.value;
    try {
        const records = await user_models_1.default.getRecords((_a = req.user) === null || _a === void 0 ? void 0 : _a.user.username);
        const data = await ehr_js_1.showAccess(doctor, records);
        return res.json({ records: data });
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.postAccess = postAccess;
const postRevoke = async (req, res) => {
    var _a;
    const doctor = req.body.value;
    try {
        const records = await user_models_1.default.getRecords((_a = req.user) === null || _a === void 0 ? void 0 : _a.user.username);
        const data = await ehr_js_1.showRevoke(doctor, records);
        return res.json({ records: data });
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.postRevoke = postRevoke;
const check = async (req, res) => {
    var _a, _b, _c;
    const doctor = req.body.value;
    delete req.body.value;
    const data = [];
    for (const key of Object.keys(req.body)) {
        if (req.body[key] != null)
            data.push(req.body[key]);
    }
    try {
        await ehr_js_1.createAccess(data, (_a = req.user) === null || _a === void 0 ? void 0 : _a.secrets.bigchainPublicKey, (_b = req.user) === null || _b === void 0 ? void 0 : _b.secrets.bigchainPrivateKey, doctor, (_c = req.user) === null || _c === void 0 ? void 0 : _c.secrets.secretKey);
        return res.redirect('/user/home');
    }
    catch (err) {
        console.error('Chck error is ', err);
        return res.sendStatus(404);
    }
};
exports.check = check;
const uncheck = async (req, res) => {
    var _a, _b;
    const doctor = req.body.value;
    delete req.body.value;
    const data = [];
    for (const key of Object.keys(req.body)) {
        if (req.body[key] != null)
            data.push(req.body[key]);
    }
    try {
        await ehr_js_1.revokeAccess(data, (_a = req.user) === null || _a === void 0 ? void 0 : _a.secrets.bigchainPublicKey, (_b = req.user) === null || _b === void 0 ? void 0 : _b.secrets.bigchainPrivateKey, doctor);
        return res.redirect('/user/home');
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.uncheck = uncheck;
const prescription = async (req, res) => {
    var _a, _b;
    const demail = req.body.value;
    console.log(demail);
    try {
        const data = await ehr_js_1.getPrescription((_a = req.user) === null || _a === void 0 ? void 0 : _a.user.username, demail, (_b = req.user) === null || _b === void 0 ? void 0 : _b.secrets.secretKey);
        console.log(data);
        return res.json({ records: data });
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.prescription = prescription;
const assetHistory = async (req, res) => {
    var _a;
    let assetid = req.body.history;
    try {
        let data = await ehr_js_1.getAssetHistory(assetid);
        return res.render('patient/asset.ejs', { records: data, name: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.name });
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.assetHistory = assetHistory;
const addRecord = async (req, res) => {
    var _a, _b, _c, _d, _e;
    if (req.files.length < 1) {
        return res.status(404).json({ status: 'File not uploaded' });
    }
    let fields = req.body;
    let fileBuffer = req.files[0].buffer;
    let data = {
        height: fields.height,
        weight: fields.weight,
        symptoms: fields.symptoms,
        allergies: fields.allergies,
        smoking: fields.smoking,
        exercise: fields.exercise,
        description: fields.d,
        schema: 'record'
    };
    try {
        await ehr_js_1.createRecord(data, (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.username, fileBuffer, (_b = req.user) === null || _b === void 0 ? void 0 : _b.secrets.bigchainPublicKey, (_c = req.user) === null || _c === void 0 ? void 0 : _c.secrets.bigchainPrivateKey, (_d = req.user) === null || _d === void 0 ? void 0 : _d.secrets.secretKey, (_e = req.user) === null || _e === void 0 ? void 0 : _e.user.email);
        return res.redirect('/user/medicalhistory');
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.addRecord = addRecord;
//# sourceMappingURL=user.controller.js.map