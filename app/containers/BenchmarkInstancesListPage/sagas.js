import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import {
  getBenchmarkInstances,
  removeBenchmarkInstance,
  createBenchmarkInstance,
  updateBenchmarkInstance,
  getBenchmarkInstance,
} from 'utils/tprapi';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_INSTANCES_REQUEST,
  LOAD_INSTANCES_SUCCESS,
  LOAD_INSTANCES_ERROR,
  DELETE_INSTANCE_REQUEST,
  DELETE_INSTANCE_SUCCESS,
  DELETE_INSTANCE_ERROR,
  CREATE_INSTANCE_REQUEST,
  CREATE_INSTANCE_SUCCESS,
  CREATE_INSTANCE_ERROR,
  GET_INSTANCE_REQUEST,
  GET_INSTANCE_SUCCESS,
  GET_INSTANCE_ERROR,
  UPDATE_INSTANCE_REQUEST,
  UPDATE_INSTANCE_SUCCESS,
  UPDATE_INSTANCE_ERROR,
} from 'containers/BenchmarksPage/constants';

function* loadInstances() {
  try {
    const data = yield call(getBenchmarkInstances);
    yield put({ type: LOAD_INSTANCES_SUCCESS, data: data.items });
  } catch (error) {
    yield put({ type: LOAD_INSTANCES_ERROR, error });
  }
}

function* deleteInstance(action) {
  try {
    yield call(removeBenchmarkInstance, action.instance);
    yield put({ type: DELETE_INSTANCE_SUCCESS, data: action.instance });
  } catch (error) {
    yield put({ type: DELETE_INSTANCE_ERROR, error });
  }
}

function* createInstance(action) {
  try {
    const data = yield call(createBenchmarkInstance, action.instance);
    yield put({ type: CREATE_INSTANCE_SUCCESS, data });
  } catch (error) {
    yield put({ type: CREATE_INSTANCE_ERROR, error });
  }
}

function* updateInstance(action) {
  try {
    const data = yield call(updateBenchmarkInstance, action.instance);
    yield put({ type: UPDATE_INSTANCE_SUCCESS, data });
  } catch (error) {
    yield put({ type: UPDATE_INSTANCE_ERROR, error });
  }
}

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
  [LOAD_INSTANCES_REQUEST, loadInstances],
  [DELETE_INSTANCE_REQUEST, deleteInstance],
  [CREATE_INSTANCE_REQUEST, createInstance],
  [UPDATE_INSTANCE_REQUEST, updateInstance],
  [GET_INSTANCE_REQUEST, getInstance],
].map((d) => makeSaga(d[0], d[1]));
