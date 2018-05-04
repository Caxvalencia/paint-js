import { Brush } from './brush';

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
        this.configCanvas();
        this.sizeConfiguration();

        this.brush = new Brush(this.ctx);
    }

    sizeConfiguration() {
        let sizeRange = <HTMLInputElement>document.getElementById('tam');
        let sizeInput = <HTMLDataElement>document.getElementById('DatoTam');

        sizeRange.addEventListener('change', (event: any) => {
            this.brush.size = event.target.value;
            sizeInput.value = sizeRange.value;
        });

        sizeInput.addEventListener('click', (event: any) => {
            this.brush.size = event.target.value;
            sizeRange.value = sizeInput.value;
        });
    }

    configCanvas() {
        let canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 400;
        canvas.style.border = '1px black solid';
        canvas.style.cursor = 'pointer';

        document.getElementById('Pintar').appendChild(canvas);

        this.ctx = canvas.getContext('2d');

        this.addEventsToCanvas(canvas);
    }

    process(x, y, mouseupTriggered, isMoving?) {
        if (this.isRandomColor) {
            this.randomColor();
        }

        this.storeShot(x, y, isMoving);

        if (!mouseupTriggered) {
            this.draw();
        }
    }

    storeShot(x: number, y: number, isMoving: boolean): any {
        storageStage.push([
            x,
            y,
            isMoving,
            this.brush.color,
            this.brush.type,
            this.brush.size
        ]);
    }

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
            this.limpiar(canvas);
        });
    }

    limpiar(canvas) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);

        storageStage = [];
    }

    randomColor() {
        const r = Math.round(Math.random() * 255);
        const g = Math.round(Math.random() * 255);
        const b = Math.round(Math.random() * 255);
        const alpha = Math.round(Math.random() * 100) / 100;

        this.brush.color = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }

    draw() {
        for (let i = 1; i <= storageStage.length; i++) {
            // brushType[i]
            let storagedBefore = storageStage[i - 1];
            let storaged = storageStage[i];

            if (storaged[StorageIndex.isMoving]) {
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
}

new Paint();
