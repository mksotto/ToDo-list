export const getNewOrUndefined = <T>(previous: T, updated: T): T | undefined => {
    return previous !== updated ? updated : undefined;
};

export const getNewOrNullOrUndefined = <T>(previous: T | null, updated: T | null): T | null | undefined => {
    if (previous === null && updated === '') return undefined;
    if (typeof previous === "string" && updated === undefined) return null;
    if (updated === '') return null;
    return previous !== updated ? updated : undefined;
}