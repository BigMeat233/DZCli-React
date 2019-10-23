import { take, call, put, cancel, takeLatest, select } from 'redux-saga/effects';
import { GET_CURRENT_IP_ACTION } from './constants';
import { LOCATION_CHANGE } from 'connected-react-router';
import { setCurrentIpAction } from './actions';

function request(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
}

function* getCurrentIp() {
  const data = yield call(request, 'http://og.gl/Model.do');
  if (data.HEAD.code === '000000') {
    yield put(setCurrentIpAction(data.BODY.ipAddr));
  } else {
    yield put(setCurrentIpAction(data.HEAD.msg));
  }
}

function* getCurrentIpSaga() {
  const watcher = yield takeLatest(GET_CURRENT_IP_ACTION, getCurrentIp);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  getCurrentIpSaga
];