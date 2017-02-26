import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { getFunction } from 'utils/api';
import { GET_FUNCTION_REQUEST, GET_FUNCTION_SUCCESS, GET_FUNCTION_ERROR } from 'containers/FunctionsPage/constants';
import { LOCATION_CHANGE } from 'react-router-redux';


function* getFunctionSagaRequest(action) {
  try {
    const data = yield call(getFunction, action.name);
    yield put({ type: GET_FUNCTION_SUCCESS, data });
  } catch (error) {
    yield put({ type: GET_FUNCTION_ERROR, error });
  }
}

function* getFunctionSaga() {
  // See example in containers/HomePage/sagas.js
  const watcher = yield takeLatest(GET_FUNCTION_REQUEST, getFunctionSagaRequest);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  getFunctionSaga,
];
