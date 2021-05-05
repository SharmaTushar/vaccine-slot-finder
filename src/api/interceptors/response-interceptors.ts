export const returnData = (successResponse: any) => {
    return successResponse.data;
}

export const logError = (error: any) => {
    console.error(error.response.message);
    console.error(error.response.data);
    return error;
};
