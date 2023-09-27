export class Mouse {
    private static _x = 0;
    private static _y = 0;
    private static _clicked = false;
    private static _initialized = false;

    public static initialize() {
        if (this._initialized) return;
        this._initialized = true;

        window.addEventListener("mousemove", this.mousemove);
        window.addEventListener("click", this.click);
    }

    public static get x(): number {
        return this._x;
    }

    public static get y(): number {
        return this._y;
    }

    public static get clicked(): boolean {
        const clicked = this._clicked;
        if (clicked) this._clicked = false;
        return clicked;
    }

    private static mousemove = (event: MouseEvent): void => {
        this._x = event.clientX;
        this._y = event.clientY;
    };

    private static click = () => {
        this._clicked = true;
    };
}

Mouse.initialize();
