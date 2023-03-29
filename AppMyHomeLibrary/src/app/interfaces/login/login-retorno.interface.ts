import { Messages } from "../retorno-web-api/messages.interface";
import { Pages } from "../retorno-web-api/pages.interface";
import { RetornoItems } from "./retorno-items.interface";

export interface LoginRetorno {
    isOk: boolean;
    pages: Pages;
    messages: Array<Messages>;
    items: Array<RetornoItems>;
}