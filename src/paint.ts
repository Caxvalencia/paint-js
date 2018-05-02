import { Brush } from './brush';

declare let document;

export class Paint {
    ctx: any;

    constructor() {
        this.configCanvas();
    }

    configCanvas() {
        let canvasDiv = document.getElementById('Pintar');
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', 800);
        canvas.setAttribute('height', 400);
        canvasDiv.appendChild(canvas);

        this.ctx = canvas.getContext('2d');

        canvas.style.border = '1px black solid';
        canvas.style.cursor = 'pointer';

        this.addEventsToCanvas(canvas);
    }

    addEventsToCanvas(canvas) {
        canvas.onmousedown = function(e) {
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;

            procesar(x, y, 1);
        };

        canvas.onmousemove = function(e) {
            if (E == 1) {
                const x = e.pageX - this.offsetLeft;
                const y = e.pageY - this.offsetTop;

                procesar(x, y, 1, true);
            }
        };

        canvas.onmouseup = function() {
            E = 0;
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
            delete E[i];
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
let E; /*Estado = Controlar cuando dibujar*/

let size = 10;
let brocha = 'normal';
let color = 'black';
let CAzar;

/*Eventos para los Colores*/
document.getElementById('white').addEventListener('click', event => {
    addColor(event.target.id);
});
document.getElementById('black').addEventListener('click', function(event) {
    addColor(event.target.id);
});
document.getElementById('red').addEventListener('click', function(event) {
    addColor(event.target.id);
});
document.getElementById('blue').addEventListener('click', function(event) {
    addColor(event.target.id);
});
document.getElementById('green').addEventListener('click', function(event) {
    addColor(event.target.id);
});
document.getElementById('yellow').addEventListener('click', function(event) {
    addColor(event.target.id);
});
document.getElementById('brown').addEventListener('click', function(event) {
    addColor(event.target.id);
});
document.getElementById('purple').addEventListener('click', function(event) {
    addColor(event.target.id);
});
document.getElementById('azar').addEventListener('click', function() {
    CAzar = 'azar';
});
/*Eventos Brochas*/
document.getElementById('normal').addEventListener('click', function(event) {
    addBrocha(event.target.id);
});
document.getElementById('circulo').addEventListener('click', function(event) {
    addBrocha(event.target.id);
});
document.getElementById('rect').addEventListener('click', function(event) {
    addBrocha(event.target.id);
});
/*Eventos de Herramientas*/
let tam = document.getElementById('tam');

tam.addEventListener('mousemove', function(event) {
    addS_a(event.target.value);
});

let DatoTam = document.getElementById('DatoTam');

DatoTam.addEventListener('click', function(event) {
    addS_b(event.target.value);
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
    DatoTam.value = tam.value;
}

function addS_b(clickS) {
    size = clickS;
    tam.value = DatoTam.value;
}

function ColorAzar() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const alpha = Math.round(Math.random() * 100) / 100;

    color = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

function procesar(x, y, e, moviendo?) {
    if (CAzar == 'azar') {
        ColorAzar();
    }

    DatoX.push(x);
    DatoY.push(y);
    DatoM.push(moviendo);
    DatoC.push(color);
    brushType.push(brocha);
    DatoT.push(size);
    E = e;
    E == 1 ? dibujar() : null;
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

            // case 'circulo':
            //     if (DatoM[i] && i)
            //         Brush.circle(
            //             DatoX[i - 1],
            //             DatoY[i - 1],
            //             2,
            //             DatoT[i],
            //             false,
            //             DatoC[i],
            //             DatoC[i],
            //             ctx
            //         );
            //     else
            //         circulo.circulos(
            //             DatoX[i],
            //             DatoY[i],
            //             2,
            //             DatoT[i],
            //             false,
            //             DatoC[i],
            //             DatoC[i],
            //             ctx
            //         );
            //     break;
            // case 'rect':
            // if (DatoM[i] && i)
            //     rect.rects(
            //         DatoX[i - 1],
            //         DatoY[i - 1],
            //         DatoX[i],
            //         DatoY[i],
            //         DatoC[i],
            //         2,
            //         ctx
            //     );
            // else
            //     rect.rects(
            //         DatoX[i] - 1,
            //         DatoY[i],
            //         DatoX[i],
            //         DatoY[i],
            //         DatoC[i],
            //         2,
            //         ctx
            //     );
            // break;
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
const N = document.getElementById('normal').getContext('2d');
const C = document.getElementById('circulo').getContext('2d');
const R = document.getElementById('rect').getContext('2d');

N.beginPath();
N.lineWidth = 5;
//N.strokeStyle = DatoC[i];
N.lineJoin = 'round';
N.moveTo(10, 10);
N.lineTo(20, 20);
N.closePath();
N.stroke();

C.lineWidth = 5;
//C.strokeStyle = ;
C.arc(15, 15, 10, 0, 180, true);
C.stroke();

//R.strokeStyle =;
R.lineWidth = 5;
R.strokeRect(5, 5, 20, 20);
