import { Pointer } from "../canvas/Pointer";
import { IGrid } from "./Grid";
import { IXOCell } from "./XOCell";

export interface IXOGrid extends IGrid<IXOCell> {
    get rowsPointers(): Array<Array<Pointer>>;
    get diagonalsPointers(): Array<Array<Pointer>>;
    get colsPointers(): Array<Array<Pointer>>;
    get linesPointers(): Array<Array<Pointer>>;
    get cellsToWin(): number;
    get full(): boolean;
    get emptyCellsCount(): number;
}
