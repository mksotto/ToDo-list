import {tasksRequestService} from "./base.ts";

export const tasksIdDelete = (id: string) => tasksRequestService({
    url: `/${id}`,
    method: 'DELETE',
});