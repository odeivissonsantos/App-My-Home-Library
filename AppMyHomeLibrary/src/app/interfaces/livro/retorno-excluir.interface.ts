import { Messages } from "../retorno-web-api/messages.interface";
import { Pages } from "../retorno-web-api/pages.interface";

export interface RetornoExcluir {
    isOk: boolean;
    pages: Pages;
    messages: Array<Messages>;
    items: Array<string>;
}