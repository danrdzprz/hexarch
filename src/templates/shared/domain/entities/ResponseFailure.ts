export interface Errors{
    [key: string]: string[];
}

export interface ResponseFailure {
    error: string;
    message: string | Errors;
    statusCode: number;
}