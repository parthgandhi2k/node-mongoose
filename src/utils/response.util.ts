export const getSuccessResponse = (
    message: string = '',
    data: object | null = null
) => ({
    status: "success" as const,
    ...(message && { message }),
    ...(data && { data }),
});

export const getFailureResponse = (message: string = '') => ({
    status: "error" as const,
    error: {
        ...(message && { message }),
    }
});
