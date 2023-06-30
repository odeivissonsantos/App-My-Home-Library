export interface LivroFilter {
    ide_Livro: string,
    autor: string,
    ano: number,
    editora: string,
    codigoBarras: number,
    urlCapa?: string,
    titulo: string,
    observacao?: string,
    ide_Usuario: string
}