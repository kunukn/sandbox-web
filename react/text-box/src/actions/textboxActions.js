import { log } from 'utilities/logging';

export function createCalculate(data){
    log( 'createCalculate', data);
    return {
        type: 'CALCULATE',
        data
    }
}