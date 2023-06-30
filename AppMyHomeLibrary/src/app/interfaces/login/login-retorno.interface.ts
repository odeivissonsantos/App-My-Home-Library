import { CriticaDTO } from "../retorno-web-api/critica.interface";

export interface LoginRetornoDTO extends CriticaDTO {
    ideUsuario: string;
    nomeUsuario: string;
    sobrenomeUsuario: string;
    email: string;
    token: string;
}