import { Pointer } from "../canvas/Pointer";
import { ICanvasController } from "../interfaces/CanvasController";
import { IShape } from "../interfaces/Shape";
import { IView } from "../interfaces/View";
import { IXOBoard } from "../interfaces/XOBoard";
import { IXOGrid } from "../interfaces/XOGrid";
import { IXOPlayer } from "../interfaces/XOPlayer";
import { IXOPlayersController } from "../interfaces/XOPlayersController";
import { Global } from "../static/Global";
import { Mouse } from "../static/Mouse";

type GameState = { status: "tie" } | { status: "won"; winner: IShape };

export type XOGameOptions = {
    board: IXOBoard;
    playersController: IXOPlayersController;
};

export class XOGame implements IView {
    private _board: IXOBoard;
    private _playersController: IXOPlayersController;

    public constructor(o: XOGameOptions) {
        this._board = o.board;
        this._playersController = o.playersController;
    }

    public draw(cc: ICanvasController): void {
        this._board.draw(cc);
    }

    public update(): void {
        if (this.state) return;
        this._board.update();
        this.handleTurn();
    }

    private handleTurn() {
        if (this._board.grid.emptyCellsCount === 0) return;

        const player = this._playersController.current;

        if (player.cpu) {
            const opponent = this._playersController.next;
            const pointer = this.bestMove(player, opponent);
            const cell = this._board.grid.cells.get(pointer.id)!;

            cell.fill(player.shape);
            this._playersController.finishTurn();

            return;
        }

        if (Mouse.clicked) {
            const rect = Global.canvasController.rect;
            const x = Mouse.x - rect.left;
            const y = Mouse.y - rect.top;

            const cell = this._board.grid.findByPosition(x, y);
            if (!cell || cell.full) return;

            cell.fill(player.shape);
            this._playersController.finishTurn();
        }
    }

    private bestMove(current: IXOPlayer, opponent: IXOPlayer): Pointer {
        let bestScore = -Infinity;
        let move: Pointer | undefined;

        for (const [, cell] of this._board.grid.cells) {
            if (cell.full) continue;

            cell.fill(current.shape);
            const score = this.moveScore(
                this._board.grid,
                1,
                false,
                -Infinity,
                Infinity,
                current,
                opponent
            );
            cell.clear();
            if (score <= bestScore) continue;

            bestScore = score;
            move = cell.pointer;
        }

        if (move) return move;

        throw new Error("No move found for cpu");
    }

    private moveScore(
        grid: IXOGrid,
        depth: number,
        amplify: boolean,
        alpha: number,
        beta: number,
        amplifier: IXOPlayer,
        reducer: IXOPlayer
    ): number {
        const state = this.state;
        if (state) return this.evaluate(state, amplifier, reducer, depth);
        if (depth === 0) return this.heuristic(amplify, depth);

        if (amplify) {
            let bestScore = -Infinity;
            for (const [, cell] of grid.cells) {
                if (cell.full) continue;

                cell.fill(amplifier.shape);
                const score = this.moveScore(
                    grid,
                    depth - 1,
                    false,
                    alpha,
                    beta,
                    amplifier,
                    reducer
                );
                cell.clear();
                bestScore = Math.max(bestScore, score);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) break;
            }
            return bestScore;
        }

        let bestScore = Infinity;
        for (const [, cell] of grid.cells) {
            if (cell.full) continue;

            cell.fill(reducer.shape);
            const score = this.moveScore(
                grid,
                depth,
                true,
                alpha,
                beta,
                amplifier,
                reducer
            );
            cell.clear();
            bestScore = Math.min(bestScore, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) break;
        }
        return bestScore;
    }

    private evaluate(
        state: GameState,
        amplifier: IXOPlayer,
        reducer: IXOPlayer,
        depth: number
    ): number {
        if (state.status === "tie") return 0;

        let score: number | null = null;
        if (state.winner instanceof amplifier.shape) score = 9999 + depth;
        if (state.winner instanceof reducer.shape) score = -9999 + -depth;
        if (score === null) throw new Error("Unknown winner");

        return score;
    }

    private heuristic(amplify: boolean, depth: number): number {
        const score = Math.random() + depth;

        if (amplify) score;
        return score * -1;
    }

    private get state(): GameState | undefined {
        for (const line of this._board.grid.linesPointers) {
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
                if (score < this._board.grid.cellsToWin) continue;

                return { status: "won", winner: cell.shape };
            }
        }

        if (this._board.grid.full) return { status: "tie" };
    }
}
