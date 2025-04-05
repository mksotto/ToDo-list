import {makeRequestService} from "../../utils/makeRequestService.ts";
import {AUTH_API_BASE_URL} from "../../constants/constants.ts";

export const authRequestService = makeRequestService(AUTH_API_BASE_URL);