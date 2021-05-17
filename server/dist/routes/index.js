"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctor_routes_1 = __importDefault(require("./doctor.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const common_routes_1 = __importDefault(require("./common.routes"));
const chatbot_routes_1 = __importDefault(require("./chatbot.routes"));
const AuthCheck_1 = require("../utils/AuthCheck");
const router = express_1.Router();
router.get('/status', (_req, res) => {
    res.json({ status: 'OK' });
});
router.use('/', common_routes_1.default);
router.use('/user', AuthCheck_1.IsPatient, user_routes_1.default);
router.use('/doctor', AuthCheck_1.IsDoctor, doctor_routes_1.default);
router.use('/chatbot', chatbot_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map