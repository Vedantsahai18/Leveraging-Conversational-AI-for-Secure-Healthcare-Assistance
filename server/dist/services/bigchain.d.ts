export declare const createBigchainKeys: (email: string) => any;
export declare const createAsset: (asset: any, metadata: any, publicKey: string, privateKey: string) => Promise<import("bigchaindb-driver/types/transaction").CreateTransaction<Record<string, any>, Record<string, any>>>;
export declare const transferAsset: (transaction: any, metadata: any, publicKey: string, privateKey: string) => Promise<import("bigchaindb-driver/types/transaction").TransferTransaction<Record<string, any>>>;
export declare const getAsset: (query: string) => Promise<{
    id: string;
    data: Record<string, any>;
}[]>;
export declare const getMetadata: (query: string) => Promise<{
    id: string;
    metadata: Record<string, any>;
}[]>;
export declare const getTransaction: (id: string) => Promise<import("bigchaindb-driver/types/transaction").CreateTransaction<Record<string, any>, Record<string, any>>>;
export declare const listTransactions: (id: string) => Promise<(import("bigchaindb-driver/types/transaction").CreateTransaction<Record<string, unknown>, Record<string, unknown>> | import("bigchaindb-driver/types/transaction").TransferTransaction<Record<string, unknown>>)[] | import("bigchaindb-driver/types/transaction").CreateTransaction<Record<string, unknown>, Record<string, unknown>>[] | import("bigchaindb-driver/types/transaction").TransferTransaction<Record<string, unknown>>[]>;
//# sourceMappingURL=bigchain.d.ts.map