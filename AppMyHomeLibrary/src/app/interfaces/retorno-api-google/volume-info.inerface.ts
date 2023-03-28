import { Industria } from "./industria.interface";
import { LinkImagens } from "./link-imagens.interface";
import { ModoLeitura } from "./modo-leitura.interface";

export interface VolumeInfo {
    title: string;
    authors: Array<string>;
    publishedDate: string;
    description: string;
    industryIdentifiers: Array<Industria>;
    readingModes: ModoLeitura;
    pageCount: number;
    printType: string;
    categories: Array<string>;
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
    imageLinks: LinkImagens;

}