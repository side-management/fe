import { API } from "api";
import { addAuthorizationHeader } from "./middleware";

export const contentsService = new API("https://dev.contents.server.com");

contentsService.useModifyHeaders(addAuthorizationHeader);
