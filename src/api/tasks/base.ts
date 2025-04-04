import {makeRequestService} from "../../utils/makeRequestService.ts";
import {TASKS_BASE_URL} from "../../constants/constants.ts";

export const tasksRequestService = makeRequestService(TASKS_BASE_URL);