import {create} from "zustand";
import {User} from "../types/domain/todo-list.ts";
import {authDelete} from "../api/auth/authDelete.ts";

type ProfileStore = {
    profile: User | null;
    setProfile: (profile: User | null) => void;
    logout: () => Promise<void>;
};

export const useProfile = create<ProfileStore>((set) => ({
    profile: null,
    setProfile: (profile) => set({profile}),
    logout: () => authDelete().then(() => set({profile: null})),
}));