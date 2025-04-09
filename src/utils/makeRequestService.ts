import {ApiError} from "../errors/ApiError.ts";

type BaseRequestParams = {
    url: string;
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    params?: Record<string, string | number | boolean>;
    data?: any;
};

const isEmpty = (v?: Record<any, any>) => !v || Object.keys(v).length === 0;

const isObject = (v: any) => v !== null && typeof v === 'object';

const transformData = (data: any) => {
    if (!data) return undefined;
    if (isObject(data)) return JSON.stringify(data);
    return new Blob([data], {type: 'text/plain'});
};

export const makeRequestService = (baseUrl: string) => <T>({
    url,
    method,
    params,
    data,
}: BaseRequestParams): Promise<T> => fetch(
    baseUrl + url + (!isEmpty(params) ? `?${new URLSearchParams(params as any)}` : ''),
    {
        method,
        headers: {
            'Content-Type': isObject(data) ? 'application/json;charset=UTF-8' : 'text/plain;charset=UTF-8',
        },
        body: transformData(data),
        credentials: 'include',
    }
).then(r => {
    if (!r.ok) throw new ApiError(r.status, r.statusText);
    return r.headers.get('content-type') === 'application/json; charset=utf-8' ? r.json() : r.text();
});