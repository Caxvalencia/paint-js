var brochas = function() {
	this.circulos = function(x,y,a,size,fill,colorfill,color,ctx) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.fill = fill;
		this.colorfill = colorfill;
		this.color = color;

		ctx.beginPath();
		ctx.lineWidth = a;
		(this.fill==true)?ctx.fillStyle=this.colorfill:ctx.fillStyle="transparent";
		ctx.strokeStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0,180,true);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	};
	
	this.borrador = function(x,y,size,color,ctx) {
		this.x = x-(size/2)-10;
		this.y = y-(size/2)-10;
		this.size = size;
		this.color = color;
	
		ctx.beginPath();
		ctx.lineWidth = 0.1;
		ctx.strokeStyle = 'transparent';
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.size,this.size);
		ctx.strokeRect(this.x,this.y,this.size,this.size);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};
	
	this.rects = function(x,y,x2,y2,color,a,ctx) {
		this.x = x;
		this.y = y;
		this.x2 = x2;
		this.y2 = y2;
		this.color = color;

		ctx.strokeStyle = this.color;
		ctx.lineWidth = a;
		ctx.strokeRect(this.x,this.y,this.x2,this.y2);
	}
	this.lineas = function(x,y,x2,y2,color,a,ctx) {
		this.x = x;
		this.y = y;
		this.x2 = x2;
		this.y2 = y2;
		this.color = color;

		ctx.beginPath();
		
		ctx.strokeStyle = this.color;
		ctx.lineWidth = a;
		ctx.lineJoin = "round";
		
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x2,this.y2);

		ctx.closePath();
		ctx.stroke();
	}
}