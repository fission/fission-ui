import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import { createBenchmarkConfig, updateBenchmarkConfig, getBenchmarkConfig } from 'utils/tprapi';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  CREATE_CONFIG_REQUEST,
  CREATE_CONFIG_SUCCESS,
  CREATE_CONFIG_ERROR,
  GET_CONFIG_REQUEST,
  GET_CONFIG_SUCCESS,
  GET_CONFIG_ERROR,
  UPDATE_CONFIG_REQUEST,
  UPDATE_CONFIG_SUCCESS,
  UPDATE_CONFIG_ERROR,
} from 'containers/BenchmarksPage/constants';

function* createConfig(action) {
  try {
    const data = yield call(createBenchmarkConfig, action.config);
    yield put({ type: CREATE_CONFIG_SUCCESS, data });
  } catch (error) {
    yield put({ type: CREATE_CONFIG_ERROR, error });
  }
}

function* updateConfig(action) {
  try {
    const data = yield call(updateBenchmarkConfig, action.config);
    yield put({ type: UPDATE_CONFIG_SUCCESS, data });
  } catch (error) {
    yield put({ type: UPDATE_CONFIG_ERROR, error });
  }
}

function* getConfig(action) {
  try {
    const data = yield call(getBenchmarkConfig, action.name);
    yield put({ type: GET_CONFIG_SUCCESS, data });
  } catch (error) {
    yield put({ type: GET_CONFIG_ERROR, error });
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
  [CREATE_CONFIG_REQUEST, createConfig],
  [UPDATE_CONFIG_REQUEST, updateConfig],
  [GET_CONFIG_REQUEST, getConfig],
].map((d) => makeSaga(d[0], d[1]));
