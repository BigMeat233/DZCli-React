import {
  RESET_STATE_ACTION,
  GET_CURRENT_METHOD_ACTION,
  SET_CURRENT_METHOD_ACTION,
} from './constants';

export function resetStateAction() {
  return {
    type: RESET_STATE_ACTION
  };
}

export function getCurrentMethodAction() {
  return {
    type: GET_CURRENT_METHOD_ACTION
  };
}

export function setCurrentMethodAction(item) {
  return {
    type: SET_CURRENT_METHOD_ACTION,
    item
  };
}