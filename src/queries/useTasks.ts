import {useQuery} from "@tanstack/react-query";
import {tasksGet} from "../api/tasks/tasksGet.ts";
import {User} from "../types/domain/todo-list.ts";

export const useTasks = (profile: User | null) => useQuery({
    queryKey: ['tasks', profile?.id],
    queryFn: tasksGet,
    initialData: [],
    enabled: Boolean(profile),
});