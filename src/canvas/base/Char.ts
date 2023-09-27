import { ICanvasController } from "../../interfaces/CanvasController";
import { Particle } from "../Particle";
import { Shape } from "./Shape";

export abstract class Char<T extends string> extends Shape<T> {
    protected abstract readonly _type: T;
    protected abstract readonly _withParticles: boolean;

    private _initialized = false;

    protected handleDraw(cc: ICanvasController): void {
        if (this._withParticles) {
            this.initialize(cc);
            this.particles.forEach((p) => p.draw(cc));
        } else this.drawChar(cc);
    }

    private drawChar({ ctx }: ICanvasController) {
        ctx.save();
        const size = Math.max(this.w, this.h);
        ctx.font = `${size}px Verdana`;
        if (this._withParticles) ctx.lineWidth = 1;
        else ctx.lineWidth = 1.5;
        ctx.strokeText(this.type, this.x + this.w / 2, this.y + this.h / 2);
        ctx.restore();
    }

    private initialize(cc: ICanvasController): void {
        if (this._initialized) return;
        this._initialized = true;

        this.drawChar(cc);

        const image = cc.ctx.getImageData(this.x, this.y, this.w, this.h);

        for (let y = 0; y < image.height; y += 1) {
            for (let x = 0; x < image.width; x += 1) {
                const index = y * 4 * image.width + x * 4 + 3;
                if (image.data[index] <= 128) continue;

                this.particles.push(
                    new Particle({
                        x: this.x + x,
                        y: this.y + y,
                        w: 1.875,
                        h: 1.875,
                    })
                );
            }
        }
    }

    protected handleUpdate(): void {
        this.particles.forEach((p) => p.update());
    }
}
