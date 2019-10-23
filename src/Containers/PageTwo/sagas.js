import { take, call, put, cancel, takeLatest, select } from 'redux-saga/effects';
import { GET_CURRENT_METHOD_ACTION } from './constants';
import { LOCATION_CHANGE } from 'connected-react-router';
import { setCurrentMethodAction } from './actions';

function request(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
}

function* getCurrentMethod() {
  const data = yield call(request, 'http://og.gl/Model.do');
  if (data.HEAD.code === '000000') {
    yield put(setCurrentMethodAction(data.BODY.method));
  } else {
    yield put(setCurrentMethodAction(data.HEAD.msg));
  }
}

function* getCurrentMethodSaga() {
  const watcher = yield takeLatest(GET_CURRENT_METHOD_ACTION, getCurrentMethod);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  getCurrentMethodSaga
];