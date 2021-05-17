export interface UserInterface {
    email: string;
    name: string;
    username: string;
    schema: 'Patient' | 'Doctor';
    gender: string;
    institute?: string;
    specialization?: string;
    location?: string;
    RSAKey?: string;
    bigchainKey?: string;
    date?: string;
    bigchainPrivateKey?: string;
    bigchainPublicKey?: string;
}
interface SecretInterface {
    bigchainPrivateKey: string;
    bigchainPublicKey: string;
    RSAPrivateKey: string;
    RSAPublicKey: string;
    secretKey: string;
}
export interface RecordInterface {
    id: string;
    height: number;
    weight: number;
    bp?: number;
    age?: number;
    symptoms?: string;
    allergies?: string;
    smoking: 'yes' | 'no';
    exercise: 'yes' | 'no';
    description: string;
    schema: 'record';
    username: string;
    email?: string;
    file: string;
    fileHash: string;
    date: Date;
}
export interface PresecriptionInterface {
    username: string;
    assetID: string;
    description: string;
    prescription: string;
    id: number;
    schema: 'record';
}
export interface MetadataInterface {
    email: string;
    datetime: Date;
    id: number;
    doclist?: {
        email: string;
        key: string;
    }[];
}
export default class UserModel {
    user: UserInterface;
    secrets: SecretInterface;
    clientToken: string;
    schema?: 'Patient' | 'Doctor';
    constructor(user?: UserModel);
    getBio(username: string, schema: string): Promise<void>;
    private writeKeys;
    private readKeys;
    static createUser(asset: UserInterface, password: string): Promise<UserModel>;
    static getRecords(username: string): Promise<{
        id: string;
        data: Record<string, any>;
    }[]>;
}
export {};
//# sourceMappingURL=user.models.d.ts.map