window.onload = function() {
	/*Crear Canvas*/
	var canvasDiv = document.getElementById('Pintar');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', 600);
	canvas.setAttribute('height', 400);
	canvas.setAttribute('id', 'miCanvas');
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	var ctx = canvas.getContext("2d");
	/*Estilo canvas*/
	canvas.style.border='1px black solid';
	canvas.style.cursor='pointer';

	var DatoX = new Array(),   /*Posicion en X*/
		DatoY = new Array(),   /*Posicion en Y*/
		DatoM = new Array(),   /*Saber si el mouse se mueve*/
		DatoB = new Array(),   /*Contenedor de brochas*/
		DatoC = new Array(),   /*Contenedor de colores*/
		DatoT = new Array(),   /*Contenedor de tamaños*/
		E;                     /*Estado = Controlar cuando dibujar*/

	var size = 10;
	var brocha = 'normal';
	var color = 'black';
	var CAzar;

	/*Brochas*/
	var normal = new brochas();
	var circulo = new brochas();
	var rect = new brochas();
//===============================================================================================
	canvas.onmousedown = function(e) {
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		procesar(x,y,1);
	}
	canvas.onmousemove = function(e) {
		if (E==1) {
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;
			procesar(x,y,1,true);
		}
	}
	canvas.onmouseup = function(e) { E=0; }
	/*Eventos para los Colores*/
	document.getElementById('white').addEventListener('click', function(id){addColor(this.id)});
	document.getElementById('black').addEventListener('click', function(id){addColor(this.id)});
	document.getElementById('red').addEventListener('click', function(id){addColor(this.id)});
	document.getElementById('blue').addEventListener('click', function(id){addColor(this.id)});
	document.getElementById('green').addEventListener('click', function(id){addColor(this.id)});
	document.getElementById('yellow').addEventListener('click', function(id){addColor(this.id)});
	document.getElementById('brown').addEventListener('click', function(id){addColor(this.id)});
	document.getElementById('purple').addEventListener('click', function(id){addColor(this.id)});
	document.getElementById('azar').addEventListener('click', function(id){CAzar='azar'});
	/*Eventos Brochas*/
	document.getElementById('normal').addEventListener('click', function(id){addBrocha(this.id)});
	document.getElementById('circulo').addEventListener('click', function(id){addBrocha(this.id)});
	document.getElementById('rect').addEventListener('click', function(id){addBrocha(this.id)});
	/*Eventos de Herramientas*/
	document.getElementById('tam').addEventListener('mousemove', function(e){addS_a(this.value)});
	document.getElementById('DatoTam').addEventListener('click', function(e){addS_b(this.value)});
	document.getElementById('del').addEventListener('click', function(){limpiar()});
//==============================================================================================
	function addColor(clickColor)   { color=clickColor; }
	function addBrocha(clickBrocha) { brocha=clickBrocha; }
	function addS_a(clickS) { size=clickS; DatoTam.value=tam.value; }
	function addS_b(clickS) { size=clickS; tam.value=DatoTam.value; }

	function limpiar() {
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0,0, canvas.width,canvas.height);
		for(var i=0; i<=DatoX.length; i++) {
			delete DatoX[i];
			delete DatoY[i];
			delete DatoM[i];
			delete DatoC[i];
			delete E[i];
		}
	}
	function ColorAzar() {
		var r = Math.round(Math.random()*255);
		var g = Math.round(Math.random()*255);
		var b = Math.round(Math.random()*255);
		var alpha = (Math.round(Math.random()*100))/100;
		color = 'rgba('+r+','+g+','+b+','+alpha+')';
	}
	function procesar(x,y,e,moviendo) {
		if(CAzar=='azar')ColorAzar();
		DatoX.push(x);
		DatoY.push(y);
		DatoM.push(moviendo);
		DatoC.push(color);
		DatoB.push(brocha);
		DatoT.push(size);
		E=e;
		(E==1) ? dibujar() : null ;
	}

	function dibujar() {
	for(var i=1; i<=DatoX.length; i++) {

		switch (DatoB[i]) {
			case 'normal' :
					if (DatoM[i] && i) normal.lineas(DatoX[i-1],DatoY[i-1],DatoX[i],DatoY[i],DatoC[i],DatoT[i], ctx);
					else normal.lineas(DatoX[i]-1,DatoY[i], DatoX[i],DatoY[i],DatoC[i],DatoT[i], ctx);

			break;
			case 'circulo' :
				if (DatoM[i] && i) circulo.circulos(DatoX[i-1],DatoY[i-1],2,DatoT[i],false,DatoC[i],DatoC[i],ctx);
				else circulo.circulos(DatoX[i],DatoY[i],2,DatoT[i],false,DatoC[i],DatoC[i],ctx);
			break;
			case 'rect' :
				if (DatoM[i] && i) rect.rects(DatoX[i-1],DatoY[i-1],DatoX[i],DatoY[i],DatoC[i],2,ctx);
				else rect.rects(DatoX[i]-1,DatoY[i],DatoX[i],DatoY[i],DatoC[i],2,ctx);
			break;
		}
	}
	}

  /*
	function mover(DatoE) {
				//var x = e.pageX - this.offsetLeft - centroX;

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
	var N=document.getElementById('normal').getContext('2d');
	var C=document.getElementById('circulo').getContext('2d');
	var R=document.getElementById('rect').getContext('2d');

	N.beginPath();
	N.lineWidth = 5;
	//N.strokeStyle = DatoC[i];
	N.lineJoin = "round";
	N.moveTo(10,10);
	N.lineTo(20,20);
	N.closePath();
	N.stroke();

	C.lineWidth = 5;
	//C.strokeStyle = ;
	C.arc(15,15,10,0,180,true);
	C.stroke();

	//R.strokeStyle =;
	R.lineWidth = 5;
	R.strokeRect(5,5,20,20);
};