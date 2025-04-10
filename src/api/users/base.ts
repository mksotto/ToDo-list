import {makeRequestService} from "../../utils/makeRequestService.ts";
import {USERS_API_BASE_URL} from "../../constants/constants.ts";

export const usersRequestService = makeRequestService(USERS_API_BASE_URL);