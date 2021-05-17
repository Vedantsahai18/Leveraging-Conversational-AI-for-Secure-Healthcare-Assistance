"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const file_upload_1 = __importDefault(require("../middleware/file-upload"));
const AuthCheck_1 = require("../utils/AuthCheck");
const passport_1 = __importDefault(require("passport"));
const commonRouter = express_1.Router();
commonRouter.get('/', function (_req, res) {
    return res.render('index.html');
});
commonRouter.get('/login', function (_req, res) {
    return res.render('login.ejs');
});
commonRouter.get('/signup', function (_req, res) {
    return res.render('signup.ejs', { body: {}, error: null });
});
commonRouter.get('/chatbot', AuthCheck_1.IsAuthenticated, (_req, res) => {
    res.render('chatbot.ejs');
});
commonRouter.post('/signup', controllers_1.commonController.signUp);
commonRouter.post('/login', passport_1.default.authenticate('app', { failureRedirect: '/login', successRedirect: '/home', failureFlash: 'Login failed' }));
commonRouter.get('/home', AuthCheck_1.IsAuthenticated, (req, res) => {
    var _a, _b;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.schema) == 'Patient') {
        return res.redirect('/user/home');
    }
    if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.schema) == 'Doctor') {
        return res.redirect('/doctor/home');
    }
    return res.redirect('/login');
});
commonRouter.post('/getrasahistory', AuthCheck_1.IsAuthenticated, controllers_1.commonController.rasaHistory);
commonRouter.post('/view', AuthCheck_1.IsAuthenticated, controllers_1.commonController.view);
commonRouter.post('/rasa', AuthCheck_1.IsAuthenticated, file_upload_1.default.single('file'), controllers_1.commonController.rasa);
commonRouter.post('/charts', AuthCheck_1.IsAuthenticated, controllers_1.commonController.rasaCharts);
commonRouter.all('/logout', AuthCheck_1.IsAuthenticated, (req, res) => {
    req.logout();
    return res.redirect('/');
});
exports.default = commonRouter;
//# sourceMappingURL=common.routes.js.map