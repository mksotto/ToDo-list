export const getNewOrUndefined = <T>(previous: T, updated: T): T | undefined => {
    return previous !== updated ? updated : undefined;
}