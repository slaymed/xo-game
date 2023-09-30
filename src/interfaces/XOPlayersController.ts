import { IXOPlayer } from "./XOPlayer";

export interface IXOPlayersController {
    get players(): Array<IXOPlayer>;
    get current(): IXOPlayer;
    get next(): IXOPlayer;

    addPlayer(player: IXOPlayer): void;
    target(index: number): IXOPlayer;
    finishTurn(): void;
}
