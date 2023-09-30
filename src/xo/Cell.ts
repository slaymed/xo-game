import { Cell, CellOptions } from "../canvas/base/Cell";
import { ShapeOptions } from "../canvas/base/Shape";
import { ICanvasController } from "../interfaces/CanvasController";
import { IShape } from "../interfaces/Shape";
import { IXOCell } from "../interfaces/XOCell";
import { Class } from "../types/global.types";

export type XOCellOptions = CellOptions & {};

export class XOCell extends Cell implements IXOCell {
    private _shape?: IShape;

    public constructor(o: XOCellOptions) {
        super(o);
    }

    public handleDraw(cc: ICanvasController): void {
        cc.ctx.strokeRect(this.x, this.y, this.w, this.h);
        if (this._shape) this._shape.draw(cc);
    }

    public handleUpdate(): void {
        if (this._shape) this._shape.update();
    }

    public fill(Shape: Class<[ShapeOptions], IShape>): void {
        if (!Shape) throw new Error("Invalid Shape");

        this._shape = new Shape({
            w: this.w,
            h: this.h,
            x: this.x,
            y: this.y,
            margin: 20,
        });
    }

    public clear(): void {
        this._shape = undefined;
    }

    public get empty(): boolean {
        return !this._shape;
    }

    public get full(): boolean {
        return !this.empty;
    }

    public get shape(): IShape | undefined {
        return this._shape;
    }
}
