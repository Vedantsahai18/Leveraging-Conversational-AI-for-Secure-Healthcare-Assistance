"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = exports.client = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
exports.client = null;
async function Connect() {
    exports.client = await mongodb_1.MongoClient.connect(config_1.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });
}
exports.Connect = Connect;
//# sourceMappingURL=mongo.js.map