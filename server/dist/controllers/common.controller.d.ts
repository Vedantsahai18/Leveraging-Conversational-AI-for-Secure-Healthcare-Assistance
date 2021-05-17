import { Request, Response } from 'express';
export declare const signUp: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const view: (req: Request, res: Response) => Promise<string | Response<any, Record<string, any>>>;
export declare const rasa: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const rasaHistory: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const rasaCharts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=common.controller.d.ts.map