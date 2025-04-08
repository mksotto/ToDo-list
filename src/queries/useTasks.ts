import {useQuery} from "@tanstack/react-query";
import {tasksGet} from "../api/tasks/tasksGet.ts";
import {useProfile} from "../stores/ProfileStore.ts";

export const useTasks = () => {
    const {profile} = useProfile();
    return useQuery({
        queryKey: ['tasks', profile?.id],
        queryFn: tasksGet,
        initialData: [],
        enabled: Boolean(profile),
    });
};