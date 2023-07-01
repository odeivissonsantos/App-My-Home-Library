import { CriticaDTO } from "../retorno-web-api/critica.interface";

export interface RetornoBuscarPorID extends CriticaDTO {
    ide_Livro: string,
    autor: string,
    codigo_Barras: number,
    ano: number,
    editora: string,
    url_Capa: string,
    titulo: string,
    observacao: string,
    ide_Usuario: string,
}