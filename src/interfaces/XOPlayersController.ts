import { IXOPlayer } from "./XOPlayer";

export interface IXOPlayersController {
    get players(): Array<IXOPlayer>;
    get current(): IXOPlayer;

    addPlayer(player: IXOPlayer): void;
    next(): void;
}
