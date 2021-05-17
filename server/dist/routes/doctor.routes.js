"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const file_upload_1 = __importDefault(require("../middleware/file-upload"));
const doctorRouter = express_1.Router();
doctorRouter.get('/list', controllers_1.doctorController.getFiles);
doctorRouter.get('/home', controllers_1.doctorController.getDetails);
doctorRouter.post('/prescribe', controllers_1.doctorController.getPrescription);
doctorRouter.post('/prescription', file_upload_1.default.any(), controllers_1.doctorController.postPrescription);
doctorRouter.get('/profileupdate', function (req, res) {
    var _a, _b;
    res.render('doctor/profileupdate.ejs', { data: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user, name: (_b = req.user) === null || _b === void 0 ? void 0 : _b.user.name });
});
doctorRouter.get('/chatbot', function (req, res) {
    var _a;
    res.render('doctor/chatbot.ejs', { name: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.name });
});
exports.default = doctorRouter;
//# sourceMappingURL=doctor.routes.js.map