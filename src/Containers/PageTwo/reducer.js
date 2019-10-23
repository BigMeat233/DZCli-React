import { fromJS } from 'immutable';
import {
  RESET_STATE_ACTION,
  SET_CURRENT_METHOD_ACTION,
} from './constants';

const initialState = fromJS({
  method: 'NONE'
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE_ACTION:
      return initialState;
    case SET_CURRENT_METHOD_ACTION:
      return state.set('method', action.item);
    default:
      return state;
  }
}

export default reducer;
