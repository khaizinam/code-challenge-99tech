import { Request, Response, NextFunction } from 'express';
import { sendError } from './response';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error('Unhandled Error:', err);

    const statusCode = err.status || 500;
    const message = err.message || 'Something went wrong on the server';

    return sendError(res, message, statusCode);
};

export const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};
