export class Erase {
    x: number;
    y: number;
    size: any;
    color: any;

    constructor(x, y, size, color, ctx) {
        this.x = x - size / 2 - 10;
        this.y = y - size / 2 - 10;
        this.size = size;
        this.color = color;

        ctx.beginPath();
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = 'transparent';
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.strokeRect(this.x, this.y, this.size, this.size);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}
