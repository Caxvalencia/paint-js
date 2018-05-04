import { Brush } from './brush';

declare let document: Document;

export class Paint {
    ctx: CanvasRenderingContext2D;

    constructor() {
        this.configCanvas();
        this.sizeConfiguration();
    }

    sizeConfiguration() {
        let sizeRange = <HTMLInputElement>document.getElementById('tam');
        let sizeInput = <HTMLDataElement>document.getElementById('DatoTam');

        sizeRange.addEventListener('change', (event: any) => {
            brush.size = event.target.value;
            sizeInput.value = sizeRange.value;
        });

        sizeInput.addEventListener('click', (event: any) => {
            brush.size = event.target.value;
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
        if (isRandomColor) {
            randomColor();
        }

        dataX.push(x);
        dataY.push(y);
        DatoM.push(isMoving);
        DatoC.push(brush.color);
        brushType.push(brush.type);
        stackSize.push(brush.size);

        if (!mouseupTriggered) {
            draw();
        }
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

        for (let i = 0; i <= dataX.length; i++) {
            delete dataX[i];
            delete dataY[i];
            delete DatoM[i];
            delete DatoC[i];
        }
    }
}

let paint = new Paint();
let ctx = paint.ctx;
let brush = new Brush(ctx);

let dataX = []; /*Posicion en X*/
let dataY = []; /*Posicion en Y*/
let DatoM = []; /*Saber si el mouse se mueve*/
let brushType = []; /*Contenedor de Brush*/
let DatoC = []; /*Contenedor de colores*/
let stackSize = []; /*Contenedor de tamaños*/

let isRandomColor;

['white', 'black', 'red', 'blue', 'green', 'yellow', 'brown', 'purple'].forEach(
    color => {
        document.getElementById(color).addEventListener('click', event => {
            brush.color = event.srcElement.id;
            isRandomColor = false;
        });
    }
);

document.getElementById('azar').addEventListener('click', function() {
    isRandomColor = true;
});

document.getElementById('normal').addEventListener('click', function(event) {
    brush.type = event.srcElement.id;
});

function randomColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const alpha = Math.round(Math.random() * 100) / 100;

    brush.color = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

function draw() {
    for (let i = 1; i <= dataX.length; i++) {
        // brushType[i]

        if (DatoM[i]) {
            brush.line(
                dataX[i - 1],
                dataY[i - 1],
                dataX[i],
                dataY[i],
                DatoC[i],
                stackSize[i]
            );

            continue;
        }

        brush.line(
            dataX[i] - 1,
            dataY[i],
            dataX[i],
            dataY[i],
            DatoC[i],
            stackSize[i]
        );
    }
}
