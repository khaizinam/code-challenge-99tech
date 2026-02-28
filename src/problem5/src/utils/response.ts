export interface ApiResponse<T = any> {
    error: boolean;
    message: string;
    data: T;
    meta?: {
        page: number;
        total_item: number;
        total_page: number;
    };
}

export const sendSuccess = (
    res: any,
    data: any,
    message = 'Success',
    statusCode = 200,
    meta?: any,
) => {
    const response: ApiResponse = {
        error: false,
        message,
        data,
    };
    if (meta) {
        response.meta = meta;
    }
    return res.status(statusCode).json(response);
};

export const sendError = (
    res: any,
    message = 'Internal Server Error',
    statusCode = 500,
    data = null,
) => {
    const response: ApiResponse = {
        error: true,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};
