import { ICanvasController } from "../interfaces/CanvasController";
import { Global } from "../static/Global";
import { Mouse } from "../static/Mouse";
import { UI, UIOptions } from "./base/UI";

export type ParticleOptions = UIOptions & {
    mouseReaction?: boolean;
};

export class Particle extends UI {
    private _mouseReaction = true;
    private _mouseRadius = Math.random() * 25 + 50;
    private _density = Math.random() * 0.1 + 0.1;
    private _baseX = this.x;
    private _baseY = this.y;

    public constructor(o: ParticleOptions) {
        super(o);

        if (typeof o.mouseReaction === "boolean") {
            this._mouseReaction = o.mouseReaction;
        }
    }

    protected handleDraw({ ctx }: ICanvasController): void {
        const radius = Math.min(this.w, this.h) / 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    protected handleUpdate(): void {
        if (!this._mouseReaction) return;

        const base = 10;

        if (this.mouseDistance < this._mouseRadius) {
            this.x -= this.directionX;
            this.y -= this.directionY;
        } else {
            if (this.x !== this._baseX) {
                const dx = this.x - this._baseX;
                if (dx >= -base && dx <= base) this.x = this._baseX;
                else this.x -= dx / this._mouseRadius;
            }
            if (this.y !== this._baseY) {
                const dy = this.y - this._baseY;
                if (dy >= -base && dy <= base) this.y = this._baseY;
                else this.y -= dy / this._mouseRadius;
            }
        }
    }

    private get mouseDistanceX(): number {
        return Mouse.x - Global.canvasController.rect.left - this.x;
    }

    private get mouseDistanceY(): number {
        return Mouse.y - Global.canvasController.rect.top - this.y;
    }

    private get mouseDistance(): number {
        return Math.sqrt(this.mouseDistanceX ** 2 + this.mouseDistanceY ** 2);
    }

    private get forceDirectionX(): number {
        return this.mouseDistanceX / this.mouseDistance;
    }

    private get forceDirectionY(): number {
        return this.mouseDistanceY / this.mouseDistance;
    }

    private get force(): number {
        return (this._mouseRadius - this.mouseDistance) / this._mouseRadius;
    }

    private get directionX(): number {
        return this.forceDirectionX * this.force * this._density;
    }

    private get directionY(): number {
        return this.forceDirectionY * this.force * this._density;
    }
}
