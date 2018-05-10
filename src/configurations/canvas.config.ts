declare type CanvasConfigType = {
    elementSelector?: string;
    width?: number;
    height?: number;
    onclear?: Function;
    onmouse?: Function;
};

export class CanvasConfig {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    callback: Function;
    onclear: Function;

    constructor(config: CanvasConfigType) {
        this.canvas = document.querySelector(config.elementSelector);
        this.buildCanvas(this.canvas, config);

        this.onclear = config.onclear;
        this.callback = config.onmouse;
        this.context = this.canvas.getContext('2d');
    }

    static init(config: CanvasConfigType = {}) {
        return new CanvasConfig(config);
    }

    /**
     * @param {number} width
     * @param {number} height
     */
    clear(width: number, height: number) {
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, width, height);

        this.onclear();
    }

    /**
     * @private
     * @param {HTMLCanvasElement} canvas
     * @param {any} config
     */
    private buildCanvas(canvas: HTMLCanvasElement, config: any) {
        canvas.width = config.width || 800;
        canvas.height = config.height || 400;
        canvas.style.border = '1px black solid';
        canvas.style.cursor = 'pointer';

        this.addEvents(canvas);
    }

    /**
     * @param {HTMLCanvasElement} canvas
     */
    private addEvents(canvas: HTMLCanvasElement) {
        let mouseupTriggered = true;

        let offset = {
            left: canvas.offsetLeft,
            top: canvas.offsetTop
        };

        canvas.onmousedown = event => {
            const { x, y } = this.position(event, offset);
            mouseupTriggered = false;

            this.callback(x, y, mouseupTriggered);
        };

        canvas.onmousemove = event => {
            if (mouseupTriggered) {
                return;
            }

            const { x, y } = this.position(event, offset);

            this.callback(x, y, mouseupTriggered, true);
        };

        canvas.onmouseup = function() {
            mouseupTriggered = true;
        };
    }

    /**
     * @private
     * @param {MouseEvent} event
     * @param {{ left: number; top: number }} offset
     * @returns {{ x: number; y: number }}
     */
    private position(
        event: MouseEvent,
        offset: { left: number; top: number }
    ): { x: number; y: number } {
        const position = {
            x: event.pageX - offset.left,
            y: event.pageY - offset.top
        };

        return position;
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }
}
