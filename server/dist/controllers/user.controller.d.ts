import type { Request, Response } from 'express';
export declare const getDoctorList: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const getMedicalHistory: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const postAccess: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const postRevoke: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const check: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const uncheck: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const prescription: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const assetHistory: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const addRecord: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=user.controller.d.ts.map