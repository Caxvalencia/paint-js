import { Circle } from './brushes/circle.brush';
import { Erase } from './brushes/erase.brush';
import { Rect } from './brushes/rect.brush';
import { Line } from './brushes/line.brush';

export class Brush {
    rects: any;
    lineas: any;
    circulos: any;
    borrador: any;

    constructor() {
        this.circulos = Circle.prototype;
        this.borrador = Erase.prototype;
        this.rects = Rect.prototype;
        this.lineas = Line.prototype;
    }
}
