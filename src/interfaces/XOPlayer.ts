import { ShapeOptions } from "../canvas/base/Shape";
import { Class } from "../types/global.types";
import { IShape } from "./Shape";

export interface IXOPlayer {
    get id(): number;
    get shape(): Class<[ShapeOptions], IShape>;
    get cpu(): boolean;
}
