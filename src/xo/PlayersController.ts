import { IXOPlayer } from "../interfaces/XOPlayer";
import { IXOPlayersController } from "../interfaces/XOPlayersController";

export class XOPlayersController implements IXOPlayersController {
    private _players = new Set<IXOPlayer>();

    private _playerIndex = 0;

    public addPlayer(player: IXOPlayer): IXOPlayer {
        this._players.add(player);
        return player;
    }

    public finishTurn(): void {
        this._playerIndex += 1;
        if (this._playerIndex >= this._players.size) this._playerIndex = 0;
    }

    public get players(): IXOPlayer[] {
        return Array.from(this._players);
    }

    public get current(): IXOPlayer {
        return this.target(this._playerIndex);
    }

    public get next(): IXOPlayer {
        const index = this._playerIndex;
        this.finishTurn();
        const current = this.current;
        this._playerIndex = index;
        return current;
    }

    public target(index: number): IXOPlayer {
        const player = this.players[index];
        if (!player) throw new Error("No Player Found");

        return player;
    }
}
