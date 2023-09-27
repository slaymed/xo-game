import { InputEvents } from "../enums/InputEvents";
import { IInputListener } from "../interfaces/InputListener";

export type ClickPos = [number, number];

export class Input {
    private _listeners = new Map<InputEvents, Set<IInputListener>>();

    public addListener(event: InputEvents, listener: IInputListener): void {
        const listeners = this._listeners.get(event);
        if (listeners) {
            listeners.add(listener);
            return;
        }

        this._listeners.set(event, new Set([listener]));
    }
}
