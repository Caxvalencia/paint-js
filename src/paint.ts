import { Brush } from './brush';

declare let document: Document;

export class Paint {
    ctx: CanvasRenderingContext2D;

    constructor() {
        this.configCanvas();
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

    process(x, y, isMouseUp, moviendo?) {
        if (CAzar == 'azar') {
            ColorAzar();
        }

        DatoX.push(x);
        DatoY.push(y);
        DatoM.push(moviendo);
        DatoC.push(color);
        brushType.push(brocha);
        DatoT.push(size);

        if (!isMouseUp) {
            dibujar();
        }
    }

    addEventsToCanvas(canvas: HTMLCanvasElement) {
        let isMouseUp = true;

        let offset = {
            left: canvas.offsetLeft,
            top: canvas.offsetTop
        };

        canvas.onmousedown = event => {
            const x = event.pageX - offset.left;
            const y = event.pageY - offset.top;
            isMouseUp = false;

            this.process(x, y, isMouseUp);
        };

        canvas.onmousemove = event => {
            if (isMouseUp) {
                return;
            }

            const x = event.pageX - offset.left;
            const y = event.pageY - offset.top;

            this.process(x, y, isMouseUp, true);
        };

        canvas.onmouseup = function() {
            isMouseUp = true;
        };

        document.getElementById('del').addEventListener('click', () => {
            this.limpiar(canvas);
        });
    }

    limpiar(canvas) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i <= DatoX.length; i++) {
            delete DatoX[i];
            delete DatoY[i];
            delete DatoM[i];
            delete DatoC[i];
        }
    }
}

let paint = new Paint();
let ctx = paint.ctx;

let DatoX = []; /*Posicion en X*/
let DatoY = []; /*Posicion en Y*/
let DatoM = []; /*Saber si el mouse se mueve*/
let brushType = []; /*Contenedor de Brush*/
let DatoC = []; /*Contenedor de colores*/
let DatoT = []; /*Contenedor de tamaños*/

let size = 10;
let brocha = 'normal';
let color = 'black';
let CAzar;

/*Eventos para los Colores*/
document.getElementById('white').addEventListener('click', event => {
    addColor(event.srcElement.id);
});
document.getElementById('black').addEventListener('click', function(event) {
    addColor(event.srcElement.id);
});
document.getElementById('red').addEventListener('click', function(event) {
    addColor(event.srcElement.id);
});
document.getElementById('blue').addEventListener('click', function(event) {
    addColor(event.srcElement.id);
});
document.getElementById('green').addEventListener('click', function(event) {
    addColor(event.srcElement.id);
});
document.getElementById('yellow').addEventListener('click', function(event) {
    addColor(event.srcElement.id);
});
document.getElementById('brown').addEventListener('click', function(event) {
    addColor(event.srcElement.id);
});
document.getElementById('purple').addEventListener('click', function(event) {
    addColor(event.srcElement.id);
});
document.getElementById('azar').addEventListener('click', function() {
    CAzar = 'azar';
});
/*Eventos Brochas*/
document.getElementById('normal').addEventListener('click', function(event) {
    addBrocha(event.srcElement.id);
});
/*Eventos de Herramientas*/
let tam = document.getElementById('tam');

tam.addEventListener('mousemove', function(event) {
    addS_a(event.srcElement.getAttribute('value'));
});

let DatoTam = document.getElementById('DatoTam');

DatoTam.addEventListener('click', function(event) {
    addS_b(event.srcElement.getAttribute('value'));
});

//==============================================================================================

function addColor(clickColor) {
    color = clickColor;
}

function addBrocha(clickBrocha) {
    brocha = clickBrocha;
}

function addS_a(clickS) {
    size = clickS;
    DatoTam.setAttribute('value', tam.getAttribute('value'));
}

function addS_b(clickS) {
    size = clickS;
    tam.setAttribute('value', DatoTam.getAttribute('value'));
}

function ColorAzar() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const alpha = Math.round(Math.random() * 100) / 100;

    color = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

function dibujar() {
    for (let i = 1; i <= DatoX.length; i++) {
        switch (brushType[i]) {
            case 'normal':
                if (DatoM[i] && i) {
                    Brush.Line(
                        DatoX[i - 1],
                        DatoY[i - 1],
                        DatoX[i],
                        DatoY[i],
                        DatoC[i],
                        DatoT[i],
                        ctx
                    );
                } else {
                    Brush.Line(
                        DatoX[i] - 1,
                        DatoY[i],
                        DatoX[i],
                        DatoY[i],
                        DatoC[i],
                        DatoT[i],
                        ctx
                    );
                }

                break;
        }
    }
}

/*
	function mover(DatoE) {
				//const x = e.pageX - this.offsetLeft - centroX;

				switch (brocha) {
					case 1 :
						b1.circulo(x,y,10,20,false,color,color,ctx);
					break;
					case 2 :
						b2.borrador(x,y,50,'white',ctx);
					break;
					case 3 :
						b3.rects(x,y,x,y,'black',5,ctx)
					break;
					case 4 :
						b4.lineas(x,y,x2,y2,'black',5,ctx)
					break;
				}
			}
	*/
