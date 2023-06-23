export class ApiError extends Error {
    code: string;

    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

export class PrivateBetaError extends ApiError {}
