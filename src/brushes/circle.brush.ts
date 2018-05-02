export class Circle {
    x: number;
    y: number;
    size: number;
    fill: any;
    colorfill: string;
    color: string;

    constructor(x, y, a, size, fill, colorfill, color, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.fill = fill;
        this.colorfill = colorfill;
        this.color = color;

        ctx.beginPath();
        ctx.lineWidth = a;

        this.fill == true
            ? (ctx.fillStyle = this.colorfill)
            : (ctx.fillStyle = 'transparent');

        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 180, true);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
}
