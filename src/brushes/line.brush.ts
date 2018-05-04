export enum LINE_TYPE {
    bevel = 'bevel',
    round = 'round',
    miter = 'miter'
}

export class Line {
    context: CanvasRenderingContext2D;
    style: LINE_TYPE;
    protected x: number;
    protected y: number;
    protected x2: number;
    protected y2: number;
    private _size: number;
    private _color: string;

    /**
     * Creates an instance of Line.
     * @param {CanvasRenderingContext2D} context
     */
    constructor(
        context: CanvasRenderingContext2D,
        style: LINE_TYPE = LINE_TYPE.round
    ) {
        this.context = context;
        this.style = style;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns
     */
    from(x: number, y: number) {
        this.x = x;
        this.y = y;

        return this;
    }

    /**
     * @param {number} x2
     * @param {number} y2
     * @returns
     */
    to(x2: number, y2: number) {
        this.x2 = x2;
        this.y2 = y2;

        return this;
    }

    draw() {
        this.context.beginPath();
        this.context.strokeStyle = this._color;
        this.context.lineWidth = this._size;
        this.context.lineJoin = this.style;
        this.context.moveTo(this.x, this.y);
        this.context.lineTo(this.x2, this.y2);
        this.context.closePath();
        this.context.stroke();
    }

    color(color: string) {
        this._color = color;

        return this;
    }

    size(size: number) {
        this._size = size;

        return this;
    }
}
