import { InputEvents } from "../enums/InputEvents";
import { IInputListener } from "./InputListener";

export interface IInputHandler {
    addListener(event: InputEvents, listener: IInputListener): void;
}
