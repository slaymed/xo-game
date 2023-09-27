import { ICanvasController } from "../interfaces/CanvasController";

export type CanvasControllerOptions = {
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
};

export class CanvasController implements ICanvasController {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    public constructor(o: CanvasControllerOptions) {
        this._canvas = o.canvas;
        this._ctx = this._canvas.getContext("2d", {
            willReadFrequently: true,
        })!;
        this._canvas.width = o.width;
        this._canvas.height = o.height;
    }

    public alignText(
        align: CanvasTextAlign,
        baseline: CanvasTextBaseline
    ): void {
        this.ctx.textAlign = align;
        this.ctx.textBaseline = baseline;
    }

    public addGradient(...colors: Array<[number, string]>): void {
        if (!this.ctx) throw new Error("Context required!");

        const gradient = this.ctx.createLinearGradient(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        colors.forEach(([offset, color]) => {
            gradient.addColorStop(offset, color);
        });

        this.ctx.strokeStyle = gradient;
        this.ctx.fillStyle = gradient;
    }

    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public clearArea(
        x: number = 0,
        y: number = 0,
        w: number = this.canvas.width,
        h: number = this.canvas.height
    ) {
        this.ctx.clearRect(x, y, w, h);
    }

    public get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    public get rect(): DOMRect {
        return this.canvas.getBoundingClientRect();
    }
}
