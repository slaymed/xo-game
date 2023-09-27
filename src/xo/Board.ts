import { UI, UIOptions } from "../canvas/base/UI";
import { ICanvasController } from "../interfaces/CanvasController";
import { IRect } from "../interfaces/Rect";
import { Class } from "../types/global.types";
import { XOGridOptions } from "./Grid";
import { IXOBoard } from "../interfaces/XOBoard";
import { IXOGrid } from "../interfaces/XOGrid";

export type XOBoardOptions = UIOptions & {
    drawPointers?: boolean;
};

export class XOBoard extends UI implements IXOBoard {
    private _grid?: IXOGrid;
    private _pointersVisible = false;
    private _pointersOffset = 48;

    public constructor(o: XOBoardOptions) {
        super(o);

        if (o.drawPointers) this._pointersVisible = true;
    }

    public instantiateGrid(
        Grid: Class<[XOGridOptions], IXOGrid>,
        o?: Omit<XOGridOptions, "w" | "h" | "x" | "y">
    ): void {
        this._grid = new Grid(Object.assign(this.gridRect, o));
        this.grid.initialize();
    }

    protected handleDraw(cc: ICanvasController): void {
        this.grid.draw(cc);
        this.drawPointers(cc);
    }

    protected handleUpdate(): void {
        this.grid.update();
    }

    public get grid(): IXOGrid {
        if (!this._grid) {
            const msg = `Board grid required, please instantiate a grid before accessing it.`;
            throw new Error(msg);
        }
        return this._grid;
    }

    private drawPointers({ ctx }: ICanvasController) {
        if (!this._pointersVisible) return;

        ctx.save();

        const size = 20;
        ctx.font = `${size}px Verdana`;

        for (let i = 0; i < this.grid.rowsCount; i += 1) {
            const y = this.h + size * 2 - this._pointersOffset;
            const x = this.grid.cellWidth * i + this.grid.cellWidth / 2;
            ctx.fillText(`${i + 1}`, x, y);
        }

        for (let i = 0; i < this.grid.colsCount; i += 1) {
            const x = this.w + size - this._pointersOffset;
            const y = this.grid.cellHeight * i + this.grid.cellHeight / 2;
            ctx.fillText(`${i + 1}`, x, y);
        }

        ctx.restore();
    }

    private get gridRect(): IRect {
        const r = { w: this.w, h: this.h, x: this.x, y: this.y };

        if (this._pointersVisible) {
            r.w -= this._pointersOffset;
            r.h -= this._pointersOffset;
        }

        return r;
    }
}
