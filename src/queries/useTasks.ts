import {useQuery} from "@tanstack/react-query";
import {tasksGet} from "../api/tasks/tasksGet.ts";

export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: tasksGet
});