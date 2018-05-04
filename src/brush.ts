import { Line } from './brushes/line.brush';

export class Brush {
    size: number;
    type: string;
    color: string;

    private _line: Line;

    constructor(context, type = 'line', size = 10, color = 'black') {
        this.type = type;
        this.size = size;
        this.color = color;
        this._line = new Line(context);
    }

    line(
        x: number,
        y: number,
        x2: number,
        y2: number,
        color: string,
        size: number
    ) {
        return this._line
            .color(color)
            .size(size)
            .from(x, y)
            .to(x2, y2)
            .draw();
    }
}
