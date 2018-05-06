import { Brush } from './brush';
import { SizeControlConfig } from './configurations/size-controls.config';

declare let document: Document;

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
    ctx: CanvasRenderingContext2D;
    isRandomColor: boolean;

    constructor() {
        this.configureCanvas();
        SizeControlConfig.init(this.brush, { rage: 'tam', input: 'DatoTam' });
        this.configureColors();

        this.brush = new Brush(this.ctx);
    }

    configureCanvas() {
        let canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 400;
        canvas.style.border = '1px black solid';
        canvas.style.cursor = 'pointer';

        document.getElementById('Pintar').appendChild(canvas);

        this.ctx = canvas.getContext('2d');

        this.addEventsToCanvas(canvas);
    }

    configureColors() {
        [
            'white',
            'black',
            'red',
            'blue',
            'green',
            'yellow',
            'brown',
            'purple'
        ].forEach(color => {
            document.getElementById(color).addEventListener('click', event => {
                this.brush.color = event.srcElement.id;
                this.isRandomColor = false;
            });
        });

        document.getElementById('azar').addEventListener('click', () => {
            this.isRandomColor = true;
        });

        document.getElementById('normal').addEventListener('click', event => {
            this.brush.type = event.srcElement.id;
        });
    }

    /**
     * @param {any} x
     * @param {any} y
     * @param {any} mouseupTriggered
     * @param {boolean} [isMoving]
     */
    process(x: any, y: any, mouseupTriggered: any, isMoving?: boolean) {
        if (this.isRandomColor) {
            this.randomColor();
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

    /**
     * @param {HTMLCanvasElement} canvas
     */
    addEventsToCanvas(canvas: HTMLCanvasElement) {
        let mouseupTriggered = true;

        let offset = {
            left: canvas.offsetLeft,
            top: canvas.offsetTop
        };

        canvas.onmousedown = event => {
            const x = event.pageX - offset.left;
            const y = event.pageY - offset.top;
            mouseupTriggered = false;

            this.process(x, y, mouseupTriggered);
        };

        canvas.onmousemove = event => {
            if (mouseupTriggered) {
                return;
            }

            const x = event.pageX - offset.left;
            const y = event.pageY - offset.top;

            this.process(x, y, mouseupTriggered, true);
        };

        canvas.onmouseup = function() {
            mouseupTriggered = true;
        };

        document.getElementById('del').addEventListener('click', () => {
            this.clear(canvas.width, canvas.height);
        });
    }

    /**
     * @param {number} width
     * @param {number} height
     */
    clear(width: number, height: number) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, width, height);

        storageStage = [];
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

    randomColor() {
        const r = Math.round(Math.random() * 255);
        const g = Math.round(Math.random() * 255);
        const b = Math.round(Math.random() * 255);
        const alpha = Math.round(Math.random() * 100) / 100;

        this.brush.color = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }
}

new Paint();
