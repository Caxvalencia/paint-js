import { Brush } from '../brush';

export abstract class SizeControl {
    static init(brush: Brush, config: { rage: string; input: string }) {
        let sizeRange = <HTMLInputElement>document.getElementById(config.rage);
        let sizeInput = <HTMLDataElement>document.getElementById(config.input);

        sizeRange.addEventListener('change', (event: any) => {
            brush.size = event.target.value;
            sizeInput.value = sizeRange.value;
        });

        sizeInput.addEventListener('click', (event: any) => {
            brush.size = event.target.value;
            sizeRange.value = sizeInput.value;
        });
    }
}
