import { AcessoInformacao } from "./acesso-informacao.interface";
import { InformacoesPesquisa } from "./Informacoes-pesquisa.interface";
import { InformacoesVenda } from "./informacoes-venda.interface";
import { VolumeInfo } from "./volume-info.inerface";

export interface Items {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: InformacoesVenda;
    accessInfo: AcessoInformacao;
    searchInfo: InformacoesPesquisa;
}