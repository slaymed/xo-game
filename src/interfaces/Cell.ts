import { Pointer } from "../canvas/Pointer";
import { IRect } from "./Rect";
import { IUI } from "./UI";

export interface ICell extends IUI {
    get parent(): ICellParent;
    get pointer(): Pointer;
}

export interface ICellParent extends IRect {
    get colsCount(): number;
    get rowsCount(): number;
    get cellWidth(): number;
    get cellHeight(): number;
}
