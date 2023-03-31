import { Messages } from "../retorno-web-api/messages.interface";
import { Pages } from "../retorno-web-api/pages.interface";
import { RetornoItemsListarLivros } from "./retorno-items-listar-livros.interface";

export interface RetornoListarLivros {
    isOk: boolean;
    pages: Pages;
    messages: Array<Messages>;
    items: Array<RetornoItemsListarLivros>;
}