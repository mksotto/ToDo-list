import {authRequestService} from "./base.ts";

export const authDelete = () => authRequestService({
    url: '',
    method: 'DELETE',
});