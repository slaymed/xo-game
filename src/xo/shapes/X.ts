import { Char } from "../../canvas/base/Char";

export class X extends Char<"x"> {
    protected readonly _type = "x";
    protected readonly _withParticles = false;
}
