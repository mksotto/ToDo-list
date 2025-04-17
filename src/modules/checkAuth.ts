import {authGet} from "../api/auth/authGet.ts";
import {useProfile} from "../stores/ProfileStore.ts";
import {redirect} from "react-router-dom";
import {AUTH_BASE_URL} from "../constants/constants.ts";
import {isUnauthorizedError} from "../errors/UnauthorizedError.ts";

const checkAuthFn = async (required: boolean = false) => {
    const profile = useProfile.getState().profile;
    if (profile) return null;
    try {
        const profile = await authGet();
        if (profile) {
            useProfile.setState({profile});
            return null;
        }
        if (!required) return null
        return redirect(AUTH_BASE_URL);
    } catch (e) {
        if (isUnauthorizedError(e) && !required) return null;
        console.error(e);
    }
    return redirect(AUTH_BASE_URL);
};

export const checkAuth = () => checkAuthFn();

export const checkAuthRequired = () => checkAuthFn(true);