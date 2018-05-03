import { Line } from './brushes/line.brush';

export class Brush {
    size: number;
    type: string;
    color: string;

    constructor(type = 'normal', size = 10, color = 'black') {
        this.type = type;
        this.size = size;
        this.color = color;
    }

    static Line(x, y, x2, y2, color, a, ctx) {
        return new Line(x, y, x2, y2, color, a, ctx);
    }
}
