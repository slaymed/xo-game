import { ICanvasController } from "../../interfaces/CanvasController";
import { IUI } from "../../interfaces/UI";

export type UIOptions = {
    w?: number;
    h?: number;
    x?: number;
    y?: number;
    color?: string | CanvasGradient | CanvasPattern;
    margin?: number;
};

export abstract class UI implements IUI {
    private _w = 0;
    private _h = 0;
    private _x = 0;
    private _y = 0;
    private _margin = 0;
    private _color?: string | CanvasPattern | CanvasGradient;

    public constructor(o: UIOptions) {
        if (o.w) this._w = o.w;
        if (o.h) this._h = o.h;
        if (o.x) this._x = o.x;
        if (o.y) this._y = o.y;
        if (o.color) this._color = o.color;
        if (o.margin) this._margin = o.margin;
    }

    public get w(): number {
        return this._w - this._margin * 2;
    }
    public set w(w: number) {
        this._w = w;
    }

    public get h(): number {
        return this._h - this._margin * 2;
    }
    public set h(h: number) {
        this._h = h;
    }

    public get x(): number {
        return this._x + this._margin;
    }
    public set x(x: number) {
        this._x = x;
    }

    public get y(): number {
        return this._y + this._margin;
    }
    public set y(y: number) {
        this._y = y;
    }

    public get color(): string | CanvasPattern | CanvasGradient | undefined {
        return this._color;
    }

    public draw(cc: ICanvasController): void {
        if (this.color) {
            cc.ctx.save();
            cc.ctx.strokeStyle = this.color;
            cc.ctx.fillStyle = this.color;
        }
        this.handleDraw(cc);
        if (this.color) cc.ctx.restore();
    }

    public update(): void {
        this.handleUpdate();
    }

    public collideWith(x: number, y: number): boolean {
        return (
            x >= this.x &&
            x <= this.x + this.w &&
            y >= this.y &&
            y <= this.y + this.h
        );
    }

    protected abstract handleDraw(cc: ICanvasController): void;
    protected abstract handleUpdate(): void;
}
