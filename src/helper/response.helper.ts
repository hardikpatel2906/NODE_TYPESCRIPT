export const successResponse = (statusCode: number = 200, message: string, response: any) => {
    let data = {
        status: true,
        statusCode: statusCode,
        message: message,
        response: response
    }
    return data;
};

export const errorResponse = (statusCode: number = 400, message: string, response: any) => {
    let data = {
        status: false,
        statusCode: statusCode,
        message: message,
        response: response
    }
    return data;
};