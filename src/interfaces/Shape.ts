import { Particle } from "../canvas/Particle";
import { IUI } from "./UI";

export interface IShape<T extends string = string> extends IUI {
    get type(): T;
    get particles(): Particle[];
}
