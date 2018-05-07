import { Brush } from './brush';
import { CanvasConfig } from './configurations/canvas.config';
import { ColorConfig } from './configurations/color.config';
import { SizeControlConfig } from './configurations/size-controls.config';
import { StorageStage } from './storage-stage';

export class Paint {
    storageStage: StorageStage;
    brush: Brush;

    constructor() {
        this.storageStage = new StorageStage();

        const canvasConfig = CanvasConfig.init({
            elementSelector: '#paint-stage',
            onclear: this.storageStage.clear,
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
        this.storageStage.push([
            x,
            y,
            isMoving,
            this.brush.color,
            this.brush.type,
            this.brush.size
        ]);
    }

    draw() {
        for (let i = 1; i < this.storageStage.size(); i++) {
            // brushType[i]
            let storagedBefore = this.storageStage.get(i - 1);
            let storaged = this.storageStage.get(i);

            if (storaged && storaged.isMoving) {
                this.brush.line(
                    storagedBefore.x,
                    storagedBefore.y,
                    storaged.x,
                    storaged.y,
                    storaged.color,
                    storaged.size
                );

                continue;
            }

            this.brush.line(
                storaged.x - 1,
                storaged.y,
                storaged.x,
                storaged.y,
                storaged.color,
                storaged.size
            );
        }
    }
}

new Paint();
