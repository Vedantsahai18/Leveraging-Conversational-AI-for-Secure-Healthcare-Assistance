"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_models_1 = __importDefault(require("../models/user.models"));
const vaultService = __importStar(require("./vault"));
async function PassportModelsGenerate() {
    passport_1.default.use('app', new passport_local_1.Strategy(
    // Name of Parameter Fields
    {
        usernameField: 'username',
        passwordField: 'pass',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            const vault = vaultService.Vault;
            const users = await vaultService.getUsers(vault);
            // As No Such User Found
            // Login Failed
            if (!users.includes(username))
                return done(null, false);
            const status = await vaultService.login(vault, password, username);
            if (!Boolean(status))
                return done(null, false);
            const user = new user_models_1.default();
            user.clientToken = status.auth.client_token;
            await user.getBio(username, req.body.schema);
            return done(null, user);
        }
        catch (error) {
            console.error(error);
            return done(error, null);
        }
    }));
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => done(null, user));
}
exports.default = PassportModelsGenerate;
//# sourceMappingURL=Passport.js.map