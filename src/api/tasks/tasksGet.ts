import {tasksRequestService} from "./base.ts";
import {Task} from "../../types/domain/todo-list.ts";

export const tasksGet = () => tasksRequestService<Task[]>({
    url: '/',
    method: 'GET',
});