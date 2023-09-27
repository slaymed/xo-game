import { ICanvasController } from "./CanvasController";

export interface IView {
    draw(cc: ICanvasController): void;
    update(): void;
}
