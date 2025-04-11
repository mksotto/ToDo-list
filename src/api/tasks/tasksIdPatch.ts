import {TaskPatch} from "../../types/domain/todo-list.ts";
import {tasksRequestService} from "./base.ts";

export const tasksIdPatch = (id: string, data: TaskPatch) => tasksRequestService({
    url: `/${id}`,
    method: 'PATCH',
    data,
});