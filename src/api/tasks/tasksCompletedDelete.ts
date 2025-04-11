import {tasksRequestService} from "./base.ts";

export const tasksCompletedDelete = () => tasksRequestService({
    url: '/completed',
    method: 'DELETE',
});