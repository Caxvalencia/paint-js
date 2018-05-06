export class CanvasConfig {
    context: CanvasRenderingContext2D;
    callback: Function;
    onClear: Function;

    constructor(
        context: CanvasRenderingContext2D,
        callback: Function,
        onClear?: Function
    ) {
        this.context = context;
        this.callback = callback;
        this.onClear = onClear;
    }

    init(config: {
        parentElement: string;
        width?: number;
        height?: number;
    }): CanvasRenderingContext2D {
        let canvas = document.createElement('canvas');
        canvas.width = config.width || 800;
        canvas.height = config.height || 400;
        canvas.style.border = '1px black solid';
        canvas.style.cursor = 'pointer';

        document.getElementById(config.parentElement).appendChild(canvas);
        this.addEvents(canvas);

        return canvas.getContext('2d');
    }

    /**
     * @param {HTMLCanvasElement} canvas
     */
    addEvents(canvas: HTMLCanvasElement) {
        let mouseupTriggered = true;

        let offset = {
            left: canvas.offsetLeft,
            top: canvas.offsetTop
        };

        canvas.onmousedown = event => {
            const x = event.pageX - offset.left;
            const y = event.pageY - offset.top;
            mouseupTriggered = false;

            this.callback(x, y, mouseupTriggered);
        };

        canvas.onmousemove = event => {
            if (mouseupTriggered) {
                return;
            }

            const x = event.pageX - offset.left;
            const y = event.pageY - offset.top;

            this.callback(x, y, mouseupTriggered, true);
        };

        canvas.onmouseup = function() {
            mouseupTriggered = true;
        };

        document.getElementById('del').addEventListener('click', () => {
            this.clear(canvas.width, canvas.height);
        });
    }

    /**
     * @param {number} width
     * @param {number} height
     */
    clear(width: number, height: number) {
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(0, 0, width, height);

        this.onClear();
    }
}
