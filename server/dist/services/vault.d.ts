import { VaultAccess } from 'node-vault-user-pass';
export declare const Vault: VaultAccess;
export declare const vaultFromToken: (token: string) => Promise<VaultAccess>;
export declare const signUp: (vault: VaultAccess, password: string, username: string) => Promise<any>;
export declare const login: (vault: VaultAccess, password: string, username: string) => Promise<any>;
export declare const write: (vault: VaultAccess, key: string, value: string) => Promise<any>;
export declare const read: (vault: VaultAccess, key: string) => Promise<any>;
export declare const getUsers: (vault: VaultAccess) => Promise<string[]>;
//# sourceMappingURL=vault.d.ts.map