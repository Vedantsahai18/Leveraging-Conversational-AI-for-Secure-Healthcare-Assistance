export declare const getRSAKey: (email: string, schema: string) => Promise<any>;
export declare const getBigchainPublicKey: (email: string, schema: string) => Promise<any>;
export declare const createAccess: (dlist: any, publicKey: any, privateKey: any, doctorEmail: string, secretKey: string) => Promise<void>;
export declare const revokeAccess: (dlist: any, publicKey: string, privateKey: string, doctorEmail: string) => Promise<void>;
export declare const showAccess: (demail: string, records?: {
    id: string;
    data: Record<string, any>;
}[] | undefined) => Promise<{
    id: string;
    data: Record<string, any>;
}[]>;
export declare const showRevoke: (demail: string, records?: {
    id: string;
    data: Record<string, any>;
}[] | undefined) => Promise<{
    id: string;
    data: Record<string, any>;
}[]>;
export declare const createIPFSHashFromFileBuffer: (fileBuffer: any, secretKey: any) => Promise<any>;
export declare const createEncryptedIPFSHashFromFileBuffer: (fileBuffer: any, secretKey: any) => Promise<string>;
export declare const createIPFSHashFromCipher: (cipher: any) => Promise<any>;
export declare const createRecord: (data: any, username: string, fileBuffer: any, publicKey: string, privateKey: string, secretKey: string, email: string) => Promise<import("bigchaindb-driver/types/transaction").CreateTransaction<Record<string, any>, Record<string, any>>>;
export declare const getAssetHistory: (assetid: any) => Promise<{
    operation: any;
    date: any;
    doctor: string[];
}[]>;
export declare const getPrescription: (_username: string, demail: string, secretKey: string) => Promise<any>;
export declare const getDoctorFiles: (email: string, privateRSAKey: any) => Promise<any>;
//# sourceMappingURL=ehr.d.ts.map