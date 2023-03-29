export interface Usuario {
    ide_usuario: number;
    guid: string;
    email: string;
    senha: string;
    dtc_inclusao: Date;
    sts_exclusao: boolean;
    token?: string;
    cpf: string;
    qtd_acessos?: number;
    dtc_ultimo_acesso?: Date;
    ide_perfil: number;
    nome: string;
    sobrenome: string;
}