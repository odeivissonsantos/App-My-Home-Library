import { Items } from "./items.interface";

export interface RetornoApiGoogle {
    kind: string;
    totalItems: boolean;
    items: Array<Items>;
}