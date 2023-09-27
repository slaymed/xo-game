export interface ICanvasController {
    get canvas(): HTMLCanvasElement;
    get ctx(): CanvasRenderingContext2D;
    get rect(): DOMRect;

    addGradient(...colors: Array<[number, string]>): void;
    alignText(align: CanvasTextAlign, baseline: CanvasTextBaseline): void;
    clearArea(x?: number, y?: number, w?: number, h?: number): void;
}
