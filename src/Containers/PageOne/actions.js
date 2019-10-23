import {
  RESET_STATE_ACTION,
  GET_CURRENT_IP_ACTION,
  SET_CURRENT_IP_ACTION,
} from './constants';

export function resetStateAction() {
  return {
    type: RESET_STATE_ACTION
  };
}

export function getCurrentIpAction() {
  return {
    type: GET_CURRENT_IP_ACTION
  };
}

export function setCurrentIpAction(item) {
  return {
    type: SET_CURRENT_IP_ACTION,
    item
  };
}