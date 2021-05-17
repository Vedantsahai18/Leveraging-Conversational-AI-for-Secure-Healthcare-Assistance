"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const chatbotRouter = express_1.Router();
chatbotRouter.post('/filter', controllers_1.chatbotController.getFilteredRecords);
chatbotRouter.post('/upload', controllers_1.chatbotController.addRecord);
chatbotRouter.post('/getall', controllers_1.chatbotController.getAll);
exports.default = chatbotRouter;
//# sourceMappingURL=chatbot.routes.js.map