"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorFiles = exports.getPrescription = exports.getAssetHistory = exports.createRecord = exports.createIPFSHashFromCipher = exports.createEncryptedIPFSHashFromFileBuffer = exports.createIPFSHashFromFileBuffer = exports.showRevoke = exports.showAccess = exports.revokeAccess = exports.createAccess = exports.getBigchainPublicKey = exports.getRSAKey = void 0;
const services_1 = require("../services");
const crypto_1 = require("../services/crypto");
const getRSAKey = async (email, schema) => {
    let asset = await services_1.bigchainService.getAsset(email);
    asset.filter((data) => {
        return data['data']['schema'] == schema;
    });
    return asset[0]['data']['RSAKey'];
};
exports.getRSAKey = getRSAKey;
const getBigchainPublicKey = async (email, schema) => {
    const asset = (await services_1.bigchainService.getAsset(email)).filter(({ data }) => data['schema'] == schema);
    return asset[0]['data']['bigchainKey'];
};
exports.getBigchainPublicKey = getBigchainPublicKey;
const createAccess = async (dlist, publicKey, privateKey, doctorEmail, secretKey) => {
    var _a;
    for (const description of dlist) {
        const transaction = await services_1.bigchainService.listTransactions(description);
        const RSAKey = await exports.getRSAKey(doctorEmail, 'doctor');
        const encryptedKey = services_1.cryptoService.encryptRSA(secretKey, RSAKey);
        const data = {
            email: doctorEmail,
            key: encryptedKey
        };
        let metadata = transaction[transaction.length - 1].metadata;
        metadata.datetime = new Date();
        (_a = metadata.doclist) === null || _a === void 0 ? void 0 : _a.push(data);
        let tx = await services_1.bigchainService.transferAsset(transaction[transaction.length - 1], metadata, publicKey, privateKey);
        console.log(tx.id);
    }
};
exports.createAccess = createAccess;
const revokeAccess = async (dlist, publicKey, privateKey, doctorEmail) => {
    var _a;
    for (const description of dlist) {
        const transaction = await services_1.bigchainService.listTransactions(description);
        const metadata = transaction[transaction.length - 1].metadata;
        const doclist = (_a = metadata.doclist) === null || _a === void 0 ? void 0 : _a.filter(({ email }) => email != doctorEmail);
        metadata.doclist = doclist;
        console.log('metadata is ', metadata);
        let tx = await services_1.bigchainService.transferAsset(transaction[transaction.length - 1], metadata, publicKey, privateKey);
        console.log(tx.id);
    }
};
exports.revokeAccess = revokeAccess;
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const showAccess = async (demail, records) => {
    if (records == null)
        return [];
    const data = [];
    for (const asset of records) {
        const transaction = await services_1.bigchainService.listTransactions(asset.id);
        const doclist = transaction[transaction.length - 1].metadata.doclist;
        if (doclist == null)
            continue;
        const result = doclist.filter((st) => st.email.includes(demail));
        if (result.length == 0) {
            data.push(asset);
        }
    }
    return data;
};
exports.showAccess = showAccess;
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const showRevoke = async (demail, records) => {
    if (records == null)
        return [];
    const data = [];
    for (const asset of records) {
        const transaction = await services_1.bigchainService.listTransactions(asset.id);
        const doclist = transaction[transaction.length - 1].metadata.doclist;
        if (doclist == null)
            continue;
        const result = doclist.filter((st) => st.email.includes(demail));
        if (result.length != 0) {
            data.push(asset);
        }
    }
    return data;
};
exports.showRevoke = showRevoke;
const createIPFSHashFromFileBuffer = async (fileBuffer, secretKey) => {
    const cipher = services_1.cryptoService.encrypt(fileBuffer, secretKey);
    const cipherBuffer = Buffer.from(cipher, 'hex');
    return await services_1.ipfsService.AddFile(cipherBuffer);
};
exports.createIPFSHashFromFileBuffer = createIPFSHashFromFileBuffer;
const createEncryptedIPFSHashFromFileBuffer = async (fileBuffer, secretKey) => {
    const ipfsHash = await exports.createIPFSHashFromFileBuffer(fileBuffer, secretKey);
    return services_1.cryptoService.encrypt(ipfsHash, secretKey);
};
exports.createEncryptedIPFSHashFromFileBuffer = createEncryptedIPFSHashFromFileBuffer;
const createIPFSHashFromCipher = async (cipher) => {
    const cipherBuffer = Buffer.from(cipher, 'hex');
    return await services_1.ipfsService.AddFile(cipherBuffer);
};
exports.createIPFSHashFromCipher = createIPFSHashFromCipher;
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const createRecord = async (data, username, fileBuffer, publicKey, privateKey, secretKey, email) => {
    const id = services_1.cryptoService.generateCode();
    const date = new Date().toString();
    if (email === 'rasa') {
        const ipfsURL = await exports.createIPFSHashFromCipher(fileBuffer);
        const ipfsURLEncrypted = services_1.cryptoService.encrypt(ipfsURL, secretKey);
        Object.assign(data, {
            file: ipfsURLEncrypted,
            fileHash: services_1.cryptoService.hash(ipfsURLEncrypted),
            id: id,
            date: date
        });
    }
    else {
        const cipher = services_1.cryptoService.encrypt(fileBuffer, secretKey);
        const ipfsURL = await exports.createIPFSHashFromCipher(cipher);
        const ipfsURLEncrypted = services_1.cryptoService.encrypt(ipfsURL, secretKey);
        Object.assign(data, {
            username: username,
            email: email,
            file: ipfsURLEncrypted,
            fileHash: services_1.cryptoService.hash(cipher),
            id: id,
            date: date
        });
    }
    const metadata = {
        email: email,
        datetime: new Date().toString(),
        doclist: [],
        id: id
    };
    const tx = await services_1.bigchainService.createAsset(data, metadata, publicKey, privateKey);
    return tx;
};
exports.createRecord = createRecord;
const getAssetHistory = async (assetid) => {
    const transactions = await services_1.bigchainService.listTransactions(assetid);
    return transactions.map(transaction => {
        const filterTransaction = {
            operation: transaction.operation,
            date: transaction.metadata.datetime,
            doctor: []
        };
        if (transaction.operation == 'TRANSFER') {
            const doclist = transaction.metadata.doclist;
            if (doclist != null && doclist.length > 0) {
                for (const doc of doclist) {
                    filterTransaction.doctor.push(doc.email);
                }
            }
        }
        return filterTransaction;
    });
};
exports.getAssetHistory = getAssetHistory;
const getPrescription = async (_username, demail, secretKey) => {
    console.log(_username, demail, secretKey);
    const data = [];
    const assets = await services_1.bigchainService.getAsset(demail);
    for (const asset of assets) {
        if (asset.data.schema === 'record' && asset.data.hasOwnProperty('prescription')) {
            data.push({
                prescription: asset.data.prescription,
                description: asset.data.description
            });
        }
    }
    return data;
};
exports.getPrescription = getPrescription;
///////////////////////////////////////////////////////////////////////////////////////////////////
const getDoctorFiles = async (email, privateRSAKey) => {
    const metadata = await services_1.bigchainService.getMetadata(email);
    const data = {};
    const assetSet = new Set();
    for (const meta of metadata) {
        const tx = await services_1.bigchainService.listTransactions(meta.id);
        assetSet.add(tx[tx.length - 1].asset.id);
    }
    let assetList = [...assetSet];
    assetList = assetList.filter(function (element) {
        return element !== undefined;
    });
    for (const asset of assetList) {
        const tx = await services_1.bigchainService.listTransactions(asset);
        const docs = tx[tx.length - 1].metadata.doclist;
        if (docs == null)
            continue;
        let result = docs.filter((st) => st.email.includes(email));
        if (result.length != 0) {
            const decryptionKey = crypto_1.decryptRSA(result[0].key, privateRSAKey);
            console.log('decryption is ', decryptionKey);
            let ass = await services_1.bigchainService.getAsset(asset);
            if (!data[ass[0].data.username]) {
                data[ass[0].data.username] = {
                    username: ass[0].data.username,
                    email: ass[0].data.email,
                    files: []
                };
            }
            try {
                data[ass[0].data.username].files.push({
                    file: services_1.cryptoService.decrypt(ass[0].data.file, decryptionKey),
                    description: ass[0].data.description,
                    id: asset,
                    pkey: tx[tx.length - 1].outputs[0].public_keys[0],
                    secret: decryptionKey
                });
            }
            catch {
                console.log(ass[0].data.file, decryptionKey);
                continue;
            }
        }
    }
    return data;
};
exports.getDoctorFiles = getDoctorFiles;
//# sourceMappingURL=ehr.js.map