import { Pointer, PointerID } from "../canvas/Pointer";
import { ICell, ICellParent } from "./Cell";
import { IUI } from "./UI";

export interface IGrid<T extends ICell = ICell> extends ICellParent, IUI {
    get cells(): Map<PointerID, T>;
    get pointers(): Array<Pointer>;
    get initialized(): boolean;

    initialize(): void;
    cell(pointer: Pointer): T | undefined;
    findByPosition(x: number, y: number): T | undefined;
}
