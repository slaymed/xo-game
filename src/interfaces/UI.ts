import { IView } from "./View";
import { IRect } from "./Rect";

export interface IUI extends IRect, IView {
    get color(): string | CanvasGradient | CanvasPattern | undefined;
    collideWith(x: number, y: number): boolean;
}
