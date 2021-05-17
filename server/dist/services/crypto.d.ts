/// <reference types="node" />
export declare const createSecretKey: () => string;
export declare const generateIV: () => string;
export declare const encrypt: (text: any, key?: string) => string;
export declare const decrypt: (text?: string, key?: string) => string;
export declare const decryptFile: (text: string, key?: string) => Buffer;
export declare const hash: (text: string) => string;
export declare const generateRSAKeys: () => {
    privateKey: string;
    publicKey: string;
};
export declare const encryptRSA: (data: any, publicKey: string) => string;
export declare const decryptRSA: (data: any, privateKey: string) => string;
export declare const generateCode: () => string;
//# sourceMappingURL=crypto.d.ts.map