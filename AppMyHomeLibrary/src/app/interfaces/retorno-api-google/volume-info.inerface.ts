import { Industria } from "./industria.interface";

export interface VolumeInfo {
    title: string;
    authors: Array<string>;
    publishedDate: string;
    description: string;
    industryIdentifiers: Array<Industria>
}