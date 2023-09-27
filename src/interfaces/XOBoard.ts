import { Class } from "../types/global.types";
import { XOGridOptions } from "../xo/Grid";
import { IUI } from "./UI";
import { IXOGrid } from "./XOGrid";

export interface IXOBoard extends IUI {
    get grid(): IXOGrid;

    instantiateGrid(
        Grid: Class<[XOGridOptions], IXOGrid>,
        o?: Omit<XOGridOptions, "w" | "h" | "x" | "y">
    ): void;
}
