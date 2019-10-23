import { fromJS } from 'immutable';
import {
  RESET_STATE_ACTION,
  SET_CURRENT_IP_ACTION,
} from './constants';

const initialState = fromJS({
  ip: '0.0.0.0'
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE_ACTION:
      return initialState;
    case SET_CURRENT_IP_ACTION:
      return state.set('ip', action.item);
    default:
      return state;
  }
}

export default reducer;
