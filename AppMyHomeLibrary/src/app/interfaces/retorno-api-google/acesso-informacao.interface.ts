import { VersaoPdf } from "./versao-pdf.interface";
import { VersaoEbook } from "./versao.ebook.interface";

export interface AcessoInformacao {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: VersaoEbook;
    pdf: VersaoPdf;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
}