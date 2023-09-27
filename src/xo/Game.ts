import { ICanvasController } from "../interfaces/CanvasController";
import { IView } from "../interfaces/View";
import { IXOBoard } from "../interfaces/XOBoard";
import { IXOPlayersController } from "../interfaces/XOPlayersController";
import { Global } from "../static/Global";
import { Mouse } from "../static/Mouse";

export type XOGameOptions = {
    board: IXOBoard;
    playersController: IXOPlayersController;
};

export class XOGame implements IView {
    private _board: IXOBoard;
    private _ended = false;
    private _playersController: IXOPlayersController;

    public constructor(o: XOGameOptions) {
        this._board = o.board;
        this._playersController = o.playersController;
    }

    public draw(cc: ICanvasController): void {
        if (this._ended) return;
        this._board.draw(cc);
    }

    public update(): void {
        if (this._ended) return;
        this._board.update();
        this.updateStatus();
        this.handleTurn();
    }

    private handleTurn() {
        this.handleCPUTurn();
        this.handlePlayerTurn();
    }

    private handlePlayerTurn() {
        if (this._playersController.current.cpu || !Mouse.clicked) return;

        const rect = Global.canvasController.rect;
        const x = Mouse.x - rect.left;
        const y = Mouse.y - rect.top;

        const cell = this._board.grid.findByPosition(x, y);
        if (!cell || cell.full) return;

        cell.fill(this._playersController.current.shape);
        this._playersController.next();
    }

    private handleCPUTurn() {
        if (!this._playersController.current.cpu) return;

        for (const [, cell] of this._board.grid.cells) {
            if (cell.full) continue;

            cell.fill(this._playersController.current.shape);
            this._playersController.next();
            break;
        }
    }

    private updateStatus() {
        if (this._ended) return;

        winnerChecker: for (const line of this._board.grid.linesPointers) {
            let lastShapeType: string | undefined;
            let score = 0;

            for (const p of line) {
                const cell = this._board.grid.cells.get(p.id)!;
                if (!cell.shape) {
                    score = 0;
                    lastShapeType = undefined;
                    continue;
                }

                if (lastShapeType !== cell.shape.type) score = 0;

                lastShapeType = cell.shape.type;
                score += 1;

                if (score >= this._board.grid.cellsToWin) {
                    this._ended = true;
                    break winnerChecker;
                }
            }
        }
    }
}
