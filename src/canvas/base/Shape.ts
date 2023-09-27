import { IShape } from "../../interfaces/Shape";
import { Particle } from "../Particle";
import { UI, UIOptions } from "./UI";

export type ShapeOptions = UIOptions & {};

export abstract class Shape<T extends string = string>
    extends UI
    implements IShape<T>
{
    protected abstract _type: T;

    private _particles = new Array<Particle>();

    public get particles(): Particle[] {
        return this._particles;
    }

    public get type(): T {
        return this._type;
    }
}
