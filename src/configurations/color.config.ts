export class ColorConfig {
    static isRandomColor: boolean;

    constructor(brush) {
        [
            '.white',
            '.black',
            '.red',
            '.blue',
            '.green',
            '.yellow',
            '.brown',
            '.purple'
        ].forEach(color => {
            document.querySelector(color).addEventListener('click', event => {
                brush.color = event.srcElement.className;
                ColorConfig.isRandomColor = false;
            });
        });

        document.querySelector('.azar').addEventListener('click', () => {
            ColorConfig.isRandomColor = true;
        });

        document.querySelector('.normal').addEventListener('click', event => {
            brush.type = event.srcElement.className;
        });
    }

    static init(brush) {
        return new ColorConfig(brush);
    }

    static randomColor() {
        const r = Math.round(Math.random() * 255);
        const g = Math.round(Math.random() * 255);
        const b = Math.round(Math.random() * 255);
        const alpha = Math.round(Math.random() * 100) / 100;

        return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }
}
