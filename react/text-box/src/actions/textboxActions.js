import * as ACTION from './actionTypes';
import { calculateService } from 'services/calculatorServices';

function calculateSuccess(payload) {
  return {
    type: ACTION.CALCULATE_SUCCESS,
    payload,
  };
}

function calculateFailure(payload) {
  return {
    type: ACTION.CALCULATE_FAILURE,
    payload,
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
            calculationResult: response && response.result,
          })
        );
      })
      .catch(error => {
        dispatch(
          calculateFailure({
            calculationResult: error.message,
          })
        );
      });
  };
}
