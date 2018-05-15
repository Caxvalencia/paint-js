import { Brush } from '../brush';

export abstract class SizeControlConfig {
    static init(brush: Brush, { range, input }) {
        let sizeRange = <HTMLInputElement>document.querySelector(range);
        let sizeInput = <HTMLDataElement>document.querySelector(input);

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
