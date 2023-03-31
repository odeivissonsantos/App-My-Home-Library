import { Messages } from "../retorno-web-api/messages.interface";
import { Pages } from "../retorno-web-api/pages.interface";
import { RetornoItemsSalvar } from "./retorno-salvar-items.interface";

export interface RetornoSalvar {
    isOk: boolean;
    pages: Pages;
    messages: Array<Messages>;
    items: Array<RetornoItemsSalvar>;
}