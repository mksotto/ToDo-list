import {authGet} from "../api/auth/authGet.ts";
import {useProfile} from "../stores/ProfileStore.ts";
import {isApiError} from "../errors/ApiError.ts";

export const checkAuth = async () => {
    const profile = useProfile.getState().profile;
    if (profile) return null;
    try {
        const profile = await authGet();
        if (profile) {
            useProfile.setState({profile});
            return null;
        }
        return null
    } catch (e) {
        if (isApiError(e) && e.code === 401) return null;
        console.error(e);
    }
    return null;
};