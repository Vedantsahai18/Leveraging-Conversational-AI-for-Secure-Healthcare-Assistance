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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.read = exports.write = exports.login = exports.signUp = exports.vaultFromToken = exports.Vault = void 0;
const node_vault_user_pass_1 = require("node-vault-user-pass");
const config = __importStar(require("../config"));
exports.Vault = new node_vault_user_pass_1.VaultAccess({
    Authority: ['create', 'read', 'update', 'delete', 'list', 'sudo'],
    Path: 'path',
    Policy: 'auth_policy',
    EndPoint: config.VAULT.url,
    UserName: 'username',
    SecretMountPoint: 'secret_zone',
    Token: config.VAULT.token,
    CertificateMountPoint: 'certificate',
    AltToken: ''
});
const vaultFromToken = async (token) => {
    const clientVault = new node_vault_user_pass_1.VaultAccess({
        Authority: ['create', 'read', 'update', 'delete', 'list'],
        Path: 'path',
        Policy: 'auth_policy',
        EndPoint: config.VAULT.url,
        UserName: 'username',
        SecretMountPoint: 'secret_zone',
        Token: token,
        CertificateMountPoint: 'certificate',
        AltToken: ''
    });
    const username = (await clientVault.TokenLookup(undefined)).data.meta.username;
    clientVault.Config.UserName = username;
    return clientVault;
};
exports.vaultFromToken = vaultFromToken;
const signUp = async (vault, password, username) => {
    const token = vault.Config.Token;
    const result = await vault.SignUp(password, username);
    vault.Config.Token = token;
    vault.vault.token = token;
    return result;
};
exports.signUp = signUp;
const login = async (vault, password, username) => {
    const token = vault.Config.Token;
    const result = await vault.SignIn(password, username);
    vault.Config.Token = token;
    vault.vault.token = token;
    return result;
};
exports.login = login;
const write = async (vault, key, value) => {
    return await vault.Write(key, value);
};
exports.write = write;
const read = async (vault, key) => {
    return await vault.Read(key);
};
exports.read = read;
const getUsers = async (vault) => {
    return await vault.UsersGet();
};
exports.getUsers = getUsers;
//# sourceMappingURL=vault.js.map