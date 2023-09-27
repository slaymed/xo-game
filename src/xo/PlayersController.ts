import { IXOPlayer } from "../interfaces/XOPlayer";
import { IXOPlayersController } from "../interfaces/XOPlayersController";

export class XOPlayersController implements IXOPlayersController {
    private _players = new Set<IXOPlayer>();

    private _playerIndex = 0;

    public addPlayer(player: IXOPlayer): void {
        this._players.add(player);
    }

    public next(): void {
        this._playerIndex += 1;
        if (this._playerIndex >= this._players.size) this._playerIndex = 0;
    }

    public get players(): IXOPlayer[] {
        return Array.from(this._players);
    }

    public get current(): IXOPlayer {
        const player = this.players[this._playerIndex];
        if (!player) throw new Error("No Player Found");
        return player;
    }
}
