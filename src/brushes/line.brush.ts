export class Line {
    x: number;
    y: number;
    x2: number;
    y2: number;
    color: any;

    constructor(x, y, x2, y2, color, a, ctx) {
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = a;
        ctx.lineJoin = 'round';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.closePath();
        ctx.stroke();
    }
}
