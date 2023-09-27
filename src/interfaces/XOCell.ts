import { UIOptions } from "../canvas/base/UI";
import { Class } from "../types/global.types";
import { ICell } from "./Cell";
import { IShape } from "./Shape";

export interface IXOCell extends ICell {
    get empty(): boolean;
    get full(): boolean;
    get shape(): IShape | undefined;

    fill(Shape: Class<[UIOptions], IShape>): void;
}
