import { IRect } from "./Rect";

export interface IInputListener extends IRect {
    handleClick(x: number, y: number): void;
}
