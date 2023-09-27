import { ICell } from "../../interfaces/Cell";
import { IGrid } from "../../interfaces/Grid";
import { Pointer, PointerID } from "../Pointer";
import { UI, UIOptions } from "./UI";

export type GridOptions = UIOptions & {
    cols?: number;
    rows?: number;
};

export abstract class Grid<T extends ICell = ICell>
    extends UI
    implements IGrid<T>
{
    private _initialized = false;
    private _colsCount = 3;
    private _rowsCount = 3;

    private _cells = new Map<PointerID, T>();
    private _pointers = new Array<Pointer>();

    public constructor(o: GridOptions) {
        super(o);

        if (o.rows) this._rowsCount = o.rows;
        if (o.cols) this._colsCount = o.cols;
    }

    public initialize(): void {
        if (this.initialized) throw new Error("Grid already initialized!");
        this._initialized = true;
        this.initializeGrid();
    }

    protected abstract initializeGrid(): void;

    public findByPosition(x: number, y: number): T | undefined {
        for (const [, cell] of this.cells)
            if (cell.collideWith(x, y)) return cell;
    }

    public cell(pointer: Pointer): T | undefined {
        return this.cells.get(pointer.id);
    }

    public get initialized(): boolean {
        return this._initialized;
    }

    public get colsCount(): number {
        return this._colsCount;
    }

    public get rowsCount(): number {
        return this._rowsCount;
    }

    public get cells(): Map<PointerID, T> {
        return this._cells;
    }

    public get pointers(): Array<Pointer> {
        return this._pointers;
    }

    public get cellWidth(): number {
        return this.w / this.colsCount;
    }

    public get cellHeight(): number {
        return this.h / this.rowsCount;
    }
}
