import "./styles.css";
import "./tailwind.css";

import { XOGame } from "./xo/Game";
import { CanvasController } from "./canvas/CanvasController";
import { XOPlayersController } from "./xo/PlayersController";
import { XOPlayer } from "./xo/Player";
import { XOBoard } from "./xo/Board";
import { X } from "./xo/shapes/X";
import { O } from "./xo/shapes/O";
import { XOGrid } from "./xo/Grid";
import { Global } from "./static/Global";
import { Pointer } from "./canvas/Pointer";

const controller = new CanvasController({
    canvas: document.querySelector("canvas")!,
    width: 600,
    height: 600,
});
controller.alignText("center", "middle");
controller.addGradient([0, "#FEFFAC"], [0.4, "#45FFCA"], [0.8, "#EC53B0"]);

Global.canvasController = controller;

const playersController = new XOPlayersController();
playersController.addPlayer(new XOPlayer({ ShapeRef: O, cpu: true }));
playersController.addPlayer(new XOPlayer({ ShapeRef: X }));

const board = new XOBoard({
    w: controller.canvas.width,
    h: controller.canvas.height,
});
board.instantiateGrid(XOGrid, { cols: 3, rows: 3, cellsToWin: 3 });

// board.grid.cell(new Pointer(1, 1))?.fill(X);
// board.grid.cell(new Pointer(2, 1))?.fill(O);
// board.grid.cell(new Pointer(3, 1))?.fill(O);
// board.grid.cell(new Pointer(2, 2))?.fill(O);
// board.grid.cell(new Pointer(2, 3))?.fill(X);
// board.grid.cell(new Pointer(3, 3))?.fill(X);

const game = new XOGame({ board, playersController });

const animate = (_: number) => {
    controller.clearArea();
    game.draw(controller);
    game.update();

    requestAnimationFrame(animate);
};

animate(0);
