// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put, take, cancel } from 'redux-saga/effects';
import { getFunctions, getTriggersHttp } from 'utils/api';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_FUNCTIONS_REQUEST,
  LOAD_FUNCTIONS_SUCCESS,
  LOAD_FUNCTIONS_ERROR,
  DELETE_FUNCTION_REQUEST,
  DELETE_FUNCTION_SUCCESS,
  DELETE_FUNCTION_ERROR,
  LOAD_TRIGGERSHTTP_REQUEST,
  LOAD_TRIGGERSHTTP_SUCCESS,
  LOAD_TRIGGERSHTTP_ERROR,
} from 'containers/FunctionsPage/constants';

function* loadFunctions() {
  try {
    const data = yield call(getFunctions);
    yield put({ type: LOAD_FUNCTIONS_SUCCESS, data });
  } catch (error) {
    yield put({ type: LOAD_FUNCTIONS_ERROR, error });
  }
}
function* loadTriggerHttp() {
  try {
    const data = yield call(getTriggersHttp);
    yield put({ type: LOAD_TRIGGERSHTTP_SUCCESS, data });
  } catch (error) {
    yield put({ type: LOAD_TRIGGERSHTTP_ERROR, error });
  }
}


export function* getAllFunctionsSaga() {
  const watcher = yield takeLatest(LOAD_FUNCTIONS_REQUEST, loadFunctions);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* getAllTriggersHttpSaga() {
  const watcher = yield takeLatest(LOAD_TRIGGERSHTTP_REQUEST, loadTriggerHttp);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  getAllFunctionsSaga,
  getAllTriggersHttpSaga,
];
