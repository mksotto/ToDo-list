import {TaskCompleted} from "../../types/domain/todo-list.ts";
import {tasksRequestService} from "./base.ts";

export const tasksIdCompletedPut = (id: string, data: TaskCompleted) => tasksRequestService({
    url: `/${id}/completed`,
    method: 'PUT',
    data,
});