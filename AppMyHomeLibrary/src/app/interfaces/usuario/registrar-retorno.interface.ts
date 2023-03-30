import { Messages } from "../retorno-web-api/messages.interface";
import { Pages } from "../retorno-web-api/pages.interface";
import { RegistrarRetornoItems } from "./registrar-retorno-items.interface";

export interface RegistrarRetorno {
    isOk: boolean;
    pages: Pages;
    messages: Array<Messages>;
    items: Array<RegistrarRetornoItems>;
}