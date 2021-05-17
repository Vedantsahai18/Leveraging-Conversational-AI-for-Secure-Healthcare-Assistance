"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPrescription = exports.getPrescription = exports.getDetails = exports.getFiles = void 0;
const ehr_1 = require("../utils/ehr");
const services_1 = require("../services");
const getFiles = async (req, res) => {
    var _a, _b, _c;
    try {
        let data = await ehr_1.getDoctorFiles((_a = req.user) === null || _a === void 0 ? void 0 : _a.user.username, (_b = req.user) === null || _b === void 0 ? void 0 : _b.secrets.RSAPrivateKey);
        return res.render('doctor/assets.ejs', {
            records: data,
            name: (_c = req.user) === null || _c === void 0 ? void 0 : _c.user.name
        });
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.getFiles = getFiles;
const getDetails = async (req, res) => {
    var _a, _b;
    try {
        return res.render('doctor/profile.ejs', { record: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user, name: (_b = req.user) === null || _b === void 0 ? void 0 : _b.user.name });
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.getDetails = getDetails;
const getPrescription = async (req, res) => {
    var _a;
    const files = req.body.value;
    res.render('doctor/prescribe.ejs', {
        records: JSON.parse(files),
        name: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.name
    });
};
exports.getPrescription = getPrescription;
const postPrescription = async (req, res) => {
    var _a, _b, _c;
    const { id, description, pkey, prescription } = req.body;
    const code = services_1.cryptoService.generateCode();
    let data = {
        username: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.username,
        assetID: id,
        description: description,
        prescription: prescription,
        id: code,
        schema: 'record'
    };
    let metadata = {
        email: (_b = req.user) === null || _b === void 0 ? void 0 : _b.user.email,
        datetime: new Date().toString(),
        id: code
    };
    try {
        await services_1.bigchainService.createAsset(data, metadata, pkey, (_c = req.user) === null || _c === void 0 ? void 0 : _c.secrets.bigchainPrivateKey);
        return res.redirect('/doctor/home');
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
};
exports.postPrescription = postPrescription;
//# sourceMappingURL=doctor.controller.js.map