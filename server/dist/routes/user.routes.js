"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const file_upload_1 = __importDefault(require("../middleware/file-upload"));
const userRouter = express_1.Router();
userRouter.get('/doctorlist', controllers_1.userController.getDoctorList);
userRouter.get('/medicalhistory', controllers_1.userController.getMedicalHistory);
userRouter.post('/access', controllers_1.userController.postAccess);
userRouter.post('/revoke', controllers_1.userController.postRevoke);
userRouter.get('/home', function (req, res) {
    var _a, _b;
    res.render('patient/profile.ejs', { data: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user, name: (_b = req.user) === null || _b === void 0 ? void 0 : _b.user.name });
});
userRouter.get('/profileupdate', function (req, res) {
    var _a, _b;
    res.render('patient/profileupdate.ejs', { data: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user, name: (_b = req.user) === null || _b === void 0 ? void 0 : _b.user.name });
});
userRouter.get('/chatbot', function (req, res) {
    var _a;
    res.render('patient/chatbot.ejs', { name: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.name });
});
userRouter.get('/add', function (req, res) {
    var _a;
    res.render('patient/addrecord.ejs', { name: (_a = req.user) === null || _a === void 0 ? void 0 : _a.user.name });
});
userRouter.post('/check', controllers_1.userController.check);
userRouter.post('/uncheck', controllers_1.userController.uncheck);
userRouter.post('/prescription', controllers_1.userController.prescription);
userRouter.post('/assethistory', controllers_1.userController.assetHistory);
userRouter.post('/add', file_upload_1.default.any(), controllers_1.userController.addRecord);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map