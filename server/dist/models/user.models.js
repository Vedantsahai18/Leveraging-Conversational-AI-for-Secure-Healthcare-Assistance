"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class UserModel {
    constructor(user) {
        this.user = {};
        this.secrets = {};
        this.clientToken = '';
        this.schema = 'Doctor';
        if (user) {
            this.secrets = user.secrets;
            this.user = user.user;
        }
    }
    async getBio(username, schema) {
        const records = await services_1.bigchainService.getAsset(username);
        const filteredRecords = records.filter(record => record.data.schema == schema);
        this.user = filteredRecords[0].data;
        this.schema = this.user.schema;
        await this.readKeys();
    }
    async writeKeys(username) {
        const clientVault = await services_1.vaultService.vaultFromToken(this.clientToken);
        this.secrets.secretKey = services_1.cryptoService.createSecretKey();
        const bigchainKeys = services_1.bigchainService.createBigchainKeys(services_1.cryptoService.encrypt(username, this.secrets.secretKey));
        this.secrets.bigchainPrivateKey = bigchainKeys.privateKey;
        this.secrets.bigchainPublicKey = bigchainKeys.publicKey;
        const { privateKey, publicKey } = services_1.cryptoService.generateRSAKeys();
        this.secrets.RSAPrivateKey = privateKey;
        this.secrets.RSAPublicKey = publicKey;
        for (const secret in this.secrets) {
            services_1.vaultService.write(clientVault, secret, this.secrets[secret]);
        }
    }
    async readKeys() {
        const clientVault = await services_1.vaultService.vaultFromToken(this.clientToken);
        this.secrets.bigchainPrivateKey = await services_1.vaultService.read(clientVault, 'bigchainPrivateKey');
        this.secrets.bigchainPublicKey = await services_1.vaultService.read(clientVault, 'bigchainPublicKey');
        this.secrets.RSAPrivateKey = await services_1.vaultService.read(clientVault, 'RSAPrivateKey');
        this.secrets.RSAPublicKey = await services_1.vaultService.read(clientVault, 'RSAPublicKey');
        this.secrets.secretKey = await services_1.vaultService.read(clientVault, 'secretKey');
    }
    static async createUser(asset, password) {
        const vault = services_1.vaultService.Vault;
        await services_1.vaultService.signUp(vault, password, asset.username);
        const status = await services_1.vaultService.login(vault, password, asset.username);
        if (status == null) {
            throw new Error('Unable to sign in');
        }
        const vaultClientToken = status.auth.client_token;
        const user = new UserModel();
        user.clientToken = vaultClientToken;
        await user.writeKeys(asset.username);
        asset.bigchainKey = user.secrets.bigchainPublicKey.toString();
        asset.RSAKey = user.secrets.RSAPublicKey.toString();
        asset.date = new Date().toString();
        let tx = await services_1.bigchainService.createAsset(asset, null, user.secrets.bigchainPublicKey, user.secrets.bigchainPrivateKey);
        user.user = tx.asset.data;
        return user;
    }
    static async getRecords(username) {
        try {
            const records = await services_1.bigchainService.getAsset(username);
            const filterRecords = records
                .filter(record => record.data.schema == 'record' && record.data.username == username)
                .sort((a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime());
            return filterRecords;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
}
exports.default = UserModel;
//# sourceMappingURL=user.models.js.map