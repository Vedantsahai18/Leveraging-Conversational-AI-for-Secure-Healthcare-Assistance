"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// import uuid from 'uuid';
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf',
    'application/zip': 'zip',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/msword': 'doc'
};
const fileUpload = multer_1.default({
    limits: { fileSize: 20 * 1000 * 1000 },
    storage: multer_1.default.memoryStorage(),
    //    destination: (_req: any, _file: any, cb: any) => {
    //       cb(null, 'uploads/images');
    //    },
    //    filename: (_req: any, file: any, cb: any) => {
    //       const ext = MIME_TYPE_MAP[file.mimetype];
    //       cb(null, uuid + '.' + ext);
    //    }
    // }),
    fileFilter: (_req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type!');
        cb(error, isValid);
    }
});
exports.default = fileUpload;
//# sourceMappingURL=file-upload.js.map