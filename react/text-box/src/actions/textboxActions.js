import { log } from 'utilities/logging';
import * as ACTION from './actionTypes';
import { calculateService } from 'services/calculatorServices';

function calculateSuccess(data) {
  return {
    type: ACTION.CALCULATE_SUCCESS,
    data,
  };
}

function calculateFailure(data) {
  return {
    type: ACTION.CALCULATE_FAILURE,
    data,
  };
}

export function closeOverlay() {
  return {
    type: ACTION.CLOSE_OVERLAY,
  };
}

export function calculateData({ value }) {
  return (dispatch, getState) => {
    return calculateService({ value })
      .then(response => {
        dispatch(
          calculateSuccess({
            response,
            calculationResult: response && response.result,
          })
        );
      })
      .catch(error => {
        dispatch(
          calculateFailure({
            error,
            calculationResult: error.message,
          })
        );
      });
  };
}
