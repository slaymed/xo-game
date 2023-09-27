import { ICell, ICellParent } from "../../interfaces/Cell";
import { Pointer } from "../Pointer";
import { UI } from "./UI";

export type CellOptions = {
    color?: string | CanvasGradient;
    pointer: Pointer;
    parent: ICellParent;
};

export abstract class Cell extends UI implements ICell {
    private readonly _pointer: Pointer;
    private readonly _parent: ICellParent;

    public constructor(o: CellOptions) {
        super(o);
        this._pointer = o.pointer;
        this._parent = o.parent;
    }

    public get pointer(): Pointer {
        return this._pointer;
    }

    public get parent(): ICellParent {
        return this._parent;
    }

    public get w(): number {
        return this._parent.cellWidth;
    }

    public get h(): number {
        return this._parent.cellHeight;
    }

    public get x(): number {
        return (this.pointer.x - 1) * this._parent.cellWidth + this._parent.x;
    }

    public get y(): number {
        return (this.pointer.y - 1) * this._parent.cellHeight + this._parent.y;
    }
}
