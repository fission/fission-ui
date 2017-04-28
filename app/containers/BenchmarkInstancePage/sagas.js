import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import { getBenchmarkInstance } from 'utils/tprapi';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_INSTANCE_REQUEST,
  GET_INSTANCE_SUCCESS,
  GET_INSTANCE_ERROR,
} from 'containers/BenchmarksPage/constants';

function* getInstance(action) {
  try {
    const data = yield call(getBenchmarkInstance, action.name);
    yield put({ type: GET_INSTANCE_SUCCESS, data });
  } catch (error) {
    yield put({ type: GET_INSTANCE_ERROR, error });
  }
}

function makeSaga(l, f) {
  return function* s() {
    const watcher = yield takeLatest(l, f);

    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
  };
}

// All sagas to be loaded
export default [
  [GET_INSTANCE_REQUEST, getInstance],
].map((d) => makeSaga(d[0], d[1]));
