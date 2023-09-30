import { Grid, GridOptions } from "../canvas/base/Grid";
import { Pointer } from "../canvas/Pointer";
import { ICanvasController } from "../interfaces/CanvasController";
import { IXOGrid } from "../interfaces/XOGrid";
import { XOCell } from "./Cell";

export type XOGridOptions = GridOptions & {
    cellsToWin?: number;
};

export class XOGrid extends Grid<XOCell> implements IXOGrid {
    private _cellsToWin = 3;
    private _rowsPointers = new Array<Array<Pointer>>();
    private _colsPointers = new Array<Array<Pointer>>();
    private _diagonalsPointers = new Array<Array<Pointer>>();
    private _linesPointers = new Array<Array<Pointer>>();

    public constructor(o: XOGridOptions) {
        super(o);

        if (o.cellsToWin) this._cellsToWin = o.cellsToWin;
    }

    protected handleDraw(cc: ICanvasController): void {
        cc.ctx.strokeRect(this.x, this.y, this.w, this.h);
        this.cells.forEach((cell) => cell.draw(cc));
    }

    protected handleUpdate(): void {
        this.cells.forEach((cell) => cell.update());
    }

    public get rowsPointers(): Array<Array<Pointer>> {
        return this._rowsPointers;
    }

    public get diagonalsPointers(): Array<Array<Pointer>> {
        return this._diagonalsPointers;
    }

    public get colsPointers(): Array<Array<Pointer>> {
        return this._colsPointers;
    }

    public get linesPointers(): Array<Array<Pointer>> {
        return this._linesPointers;
    }

    public get cellsToWin(): number {
        return this._cellsToWin;
    }

    public get full(): boolean {
        for (const [, cell] of this.cells) if (cell.empty) return false;
        return true;
    }

    public get emptyCellsCount(): number {
        let count = 0;
        for (const [, cell] of this.cells) if (cell.empty) count += 1;
        return count;
    }

    protected initializeGrid(): void {
        const topLeftPoints = new Set<Pointer>();
        const topRightPoints = new Set<Pointer>();

        for (let r = 0; r < this.rowsCount; r += 1) {
            const row: Pointer[] = [];

            for (let c = 0; c < this.colsCount; c += 1) {
                const cell = new XOCell({
                    parent: this,
                    pointer: new Pointer(c + 1, r + 1),
                });

                this.cells.set(cell.pointer.id, cell);
                this.pointers.push(cell.pointer);
                row.push(cell.pointer);
            }

            this.rowsPointers.push(row);
            this.linesPointers.push(row);

            if (r === 0) {
                for (const p of row) {
                    topLeftPoints.add(p);
                    topRightPoints.add(p);
                }
                continue;
            }

            topLeftPoints.add(row[0]);
            topRightPoints.add(row[row.length - 1]);
        }
        this.linesPointers.concat(this.rowsPointers);

        for (let c = 0; c < this.colsCount; c += 1) {
            const col: Pointer[] = [];
            for (let r = 0; r < this.rowsCount; r += 1)
                col.push(this.rowsPointers[r][c]);
            this.colsPointers.push(col);
            this.linesPointers.push(col);
        }

        for (const p of topLeftPoints) {
            const diagonal: Pointer[] = [p];
            let x = p.x + 1;
            let y = p.y + 1;

            while (this.cells.has(Pointer.id(x, y))) {
                diagonal.push(new Pointer(x, y));
                x += 1;
                y += 1;
            }

            if (diagonal.length >= this.cellsToWin) {
                this.diagonalsPointers.push(diagonal);
                this.linesPointers.push(diagonal);
            }
        }

        for (const p of topRightPoints) {
            const diagonal: Pointer[] = [p];
            let x = p.x - 1;
            let y = p.y + 1;

            while (this.cells.has(Pointer.id(x, y))) {
                diagonal.push(new Pointer(x, y));
                x -= 1;
                y += 1;
            }

            if (diagonal.length >= this.cellsToWin) {
                this.diagonalsPointers.push(diagonal);
                this.linesPointers.push(diagonal);
            }
        }
    }
}
