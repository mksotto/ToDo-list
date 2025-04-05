import {authGet} from "../api/auth/authGet.ts";
import {redirect} from "react-router-dom";
import {AUTH_BASE_URL} from "../constants/constants.ts";

export const checkAuth = async () => {
    try {
        const profile = await authGet();
        if (profile) {
            return null;
        }
        return redirect(AUTH_BASE_URL)
    } catch {
        return redirect(AUTH_BASE_URL)
    }
};