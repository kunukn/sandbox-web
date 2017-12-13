import { log } from 'utilities/logging';

export function createCalculate(data){
    log( 'createCalculate');
    return {
        type: 'CALCULATE',
        data
    }
}