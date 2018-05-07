import { Brush } from './brush';
import { SizeControlConfig } from './configurations/size-controls.config';
import { CanvasConfig } from './configurations/canvas.config';
import { ColorConfig } from './configurations/color.config';

enum StorageIndex {
    x,
    y,
    isMoving,
    color,
    type,
    size
}

let storageStage = [];

export class Paint {
    brush: Brush;

    constructor() {
        const canvasConfig = CanvasConfig.init({
            elementSelector: '#paint-stage',
            onclear: () => (storageStage = []),
            onmouse: this.process.bind(this)
        });

        this.brush = new Brush(canvasConfig.getContext());

        ColorConfig.init(this.brush);
        SizeControlConfig.init(this.brush, { rage: 'tam', input: 'DatoTam' });
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {boolean} mouseupTriggered
     * @param {boolean} [isMoving]
     */
    process(
        x: number,
        y: number,
        mouseupTriggered: boolean,
        isMoving?: boolean
    ) {
        if (ColorConfig.isRandomColor) {
            this.brush.color = ColorConfig.randomColor();
        }

        this.storeShot(x, y, isMoving);

        if (!mouseupTriggered) {
            this.draw();
        }
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {boolean} isMoving
     */
    storeShot(x: number, y: number, isMoving: boolean): void {
        storageStage.push([
            x,
            y,
            isMoving,
            this.brush.color,
            this.brush.type,
            this.brush.size
        ]);
    }

    draw() {
        for (let i = 1; i < storageStage.length; i++) {
            // brushType[i]
            let storagedBefore = storageStage[i - 1];
            let storaged = storageStage[i];

            if (storaged && storaged[StorageIndex.isMoving]) {
                this.brush.line(
                    storagedBefore[StorageIndex.x],
                    storagedBefore[StorageIndex.y],
                    storaged[StorageIndex.x],
                    storaged[StorageIndex.y],
                    storaged[StorageIndex.color],
                    storaged[StorageIndex.size]
                );

                continue;
            }

            this.brush.line(
                storaged[StorageIndex.x] - 1,
                storaged[StorageIndex.y],
                storaged[StorageIndex.x],
                storaged[StorageIndex.y],
                storaged[StorageIndex.color],
                storaged[StorageIndex.size]
            );
        }
    }
}

new Paint();
