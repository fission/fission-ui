import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import {
  getBenchmarkConfigs,
  removeBenchmarkConfig,
  createBenchmarkConfig,
  updateBenchmarkConfig,
  getBenchmarkConfig,
} from 'utils/tprapi';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_CONFIGS_REQUEST,
  LOAD_CONFIGS_SUCCESS,
  LOAD_CONFIGS_ERROR,
  DELETE_CONFIG_REQUEST,
  DELETE_CONFIG_SUCCESS,
  DELETE_CONFIG_ERROR,
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

function* loadConfigs() {
  try {
    const data = yield call(getBenchmarkConfigs);
    yield put({ type: LOAD_CONFIGS_SUCCESS, data: data.items });
  } catch (error) {
    yield put({ type: LOAD_CONFIGS_ERROR, error });
  }
}

function* deleteConfig(action) {
  try {
    yield call(removeBenchmarkConfig, action.config);
    yield put({ type: DELETE_CONFIG_SUCCESS, data: action.config });
  } catch (error) {
    yield put({ type: DELETE_CONFIG_ERROR, error });
  }
}

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
  [LOAD_CONFIGS_REQUEST, loadConfigs],
  [DELETE_CONFIG_REQUEST, deleteConfig],
  [CREATE_CONFIG_REQUEST, createConfig],
  [UPDATE_CONFIG_REQUEST, updateConfig],
  [GET_CONFIG_REQUEST, getConfig],
].map((d) => makeSaga(d[0], d[1]));
