import { UIOptions } from "../canvas/base/UI";
import { IShape } from "../interfaces/Shape";
import { IXOPlayer } from "../interfaces/XOPlayer";
import { Class } from "../types/global.types";

export type XOPlayerOptions = {
    ShapeRef: Class<[UIOptions], IShape>;
    cpu?: boolean;
};

export class XOPlayer implements IXOPlayer {
    private readonly _id = Date.now();
    private readonly _ShapeRef: Class<[UIOptions], IShape>;

    private _cpu = false;

    public constructor(o: XOPlayerOptions) {
        this._ShapeRef = o.ShapeRef;
        if (typeof o.cpu === "boolean") this._cpu = o.cpu;
    }

    public get id(): number {
        return this._id;
    }

    public get shape(): Class<[UIOptions], IShape> {
        return this._ShapeRef;
    }

    public get cpu(): boolean {
        return this._cpu;
    }
}
