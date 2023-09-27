export type PointerID = `[x=${number}, y=${number}]`;

export class Pointer {
    public static id(x: number, y: number): PointerID {
        return `[x=${x}, y=${y}]`;
    }

    public constructor(public readonly x: number, public readonly y: number) {}

    public get id(): PointerID {
        return Pointer.id(this.x, this.y);
    }
}
