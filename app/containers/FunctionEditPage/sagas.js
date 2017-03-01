import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { getFunction, removeTriggerHttp, putFunction } from 'utils/api';
import {
  GET_FUNCTION_REQUEST,
  GET_FUNCTION_SUCCESS,
  GET_FUNCTION_ERROR,
  DELETE_TRIGGERHTTP_REQUEST,
  DELETE_TRIGGERHTTP_SUCCESS,
  DELETE_TRIGGERHTTP_ERROR,
  UPDATE_FUNCTION_REQUEST,
  UPDATE_FUNCTION_SUCCESS,
  UPDATE_FUNCTION_ERROR,
} from 'containers/FunctionsPage/constants';
import { LOCATION_CHANGE } from 'react-router-redux';


function* getFunctionSagaRequest(action) {
  try {
    const data = yield call(getFunction, action.name);
    yield put({ type: GET_FUNCTION_SUCCESS, data });
  } catch (error) {
    yield put({ type: GET_FUNCTION_ERROR, error });
  }
}
function* deleteTriggerHttp(action) {
  try {
    yield call(removeTriggerHttp, action.trigger);
    yield put({ type: DELETE_TRIGGERHTTP_SUCCESS, data: action.trigger });
  } catch (error) {
    yield put({ type: DELETE_TRIGGERHTTP_ERROR, error });
  }
}
function* updateFunction(action) {
  try {
    yield call(putFunction, action.fn);

    // force to reload the updated function again
    yield put({ type: GET_FUNCTION_REQUEST, name: action.fn.name });

    yield put({ type: UPDATE_FUNCTION_SUCCESS, data: action.fn });
  } catch (error) {
    yield put({ type: UPDATE_FUNCTION_ERROR, error });
  }
}

export function* getFunctionSaga() {
  // See example in containers/HomePage/sagas.js
  const watcher = yield takeLatest(GET_FUNCTION_REQUEST, getFunctionSagaRequest);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* removeTriggerHttpSaga() {
  const watcher = yield takeLatest(DELETE_TRIGGERHTTP_REQUEST, deleteTriggerHttp);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* updateFunctionSaga() {
  const watcher = yield takeLatest(UPDATE_FUNCTION_REQUEST, updateFunction);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  getFunctionSaga,
  removeTriggerHttpSaga,
  updateFunctionSaga,
];
