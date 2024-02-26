
import { Container, Graphics } from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

export const DEFAULT_CELL_SIZE = 50;
export const DEFAULT_GRID_SIZE = 100;
export const GRID_GRAPHICS_DISPLAY_OBJECT_NAME = '__grid_graphics';

export const behavior = {
    customDisplayObject: () => new Container(),
    customApplyProps: (instance, _, { id, cellSize, gridSize, color, lineWidth }) => {

        // cellSize size of each square in the grid
        // gridSize the length of a side of the square

        if (cellSize === undefined) { cellSize = DEFAULT_CELL_SIZE; }
        if (gridSize === undefined) { gridSize = DEFAULT_GRID_SIZE; }

        const totalWidth = cellSize * gridSize;
        const totalHeight = cellSize * gridSize;

        instance.name = id;
        instance.position.set(-totalWidth / 2, -totalHeight / 2)

        let graphics = instance.getChildByName(GRID_GRAPHICS_DISPLAY_OBJECT_NAME);
        if (!graphics) {
            graphics = new Graphics();
            graphics.name = GRID_GRAPHICS_DISPLAY_OBJECT_NAME;
            instance.addChild(graphics);
        }

        graphics.clear();

        // grid
        graphics.lineStyle(lineWidth, color);

        for (let x = 0; x < gridSize; x++) {
            if (x === gridSize / 2) { continue; }
            graphics.moveTo(x * cellSize, 0);
            graphics.lineTo(x * cellSize, totalWidth);
        }

        for (let y = 0; y < gridSize; y++) {
            if (y === gridSize / 2) { continue; }
            graphics.moveTo(0, y * cellSize);
            graphics.lineTo(totalHeight, y * cellSize);
        }

        // y axis
        graphics.lineStyle(lineWidth, 0x00ff00);
        graphics.moveTo(totalWidth / 2, 0);
        graphics.lineTo(totalWidth / 2, totalHeight);

        // x axis
        graphics.moveTo(0, totalHeight / 2);
        graphics.lineTo(totalWidth, totalHeight / 2);

        // rectangle around
        graphics.drawRect(0, 0, totalWidth, totalHeight);
        graphics.endFill();
    }
};
export const CGrid = CustomPIXIComponent(behavior, "CGrid");