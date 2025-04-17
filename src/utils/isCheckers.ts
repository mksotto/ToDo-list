export const isEmpty = (v?: Record<any, any>) => !v || Object.keys(v).length === 0;

export const isObject = (v: any): v is object => v !== null && typeof v === 'object';