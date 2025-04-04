import {tasksRequestService} from "./base.ts";
import {TaskPost} from "../../types/domain/todo-list.ts";

export const tasksPost = (data: TaskPost) => tasksRequestService({
    url: '',
    method: 'POST',
    data,
});