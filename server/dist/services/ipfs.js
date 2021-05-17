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
exports.AddFile = exports.GetFile = exports.Download = void 0;
const config = __importStar(require("../config"));
const stream_1 = require("stream");
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI(config.IPFS.url, config.IPFS.port, { protocol: 'https' });
const Download = (res, buffer) => {
    function BufferToStream(buffer) {
        const stream = new stream_1.Duplex();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }
    return new Promise((resolve, reject) => {
        return BufferToStream(buffer)
            .pipe(res)
            .on('error', (error) => {
            reject(error);
        })
            .on('finish', function () {
            resolve();
        })
            .on('end', function () {
            resolve();
        });
    });
};
exports.Download = Download;
const GetFile = async (ipfsName) => {
    const files = await ipfs.files.get(ipfsName);
    return files[0].content;
};
exports.GetFile = GetFile;
const AddFile = async (fileBuffer) => {
    return (await ipfs.files.add(fileBuffer))[0]['hash'];
};
exports.AddFile = AddFile;
//# sourceMappingURL=ipfs.js.map