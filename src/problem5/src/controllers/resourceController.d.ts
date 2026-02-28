import { Request, Response } from 'express';
export declare const createResource: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const listResources: (req: Request, res: Response) => Promise<void>;
export declare const getResource: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateResource: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteResource: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=resourceController.d.ts.map