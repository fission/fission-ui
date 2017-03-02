import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { postFunction } from 'utils/api';
import {
  CREATE_FUNCTION_REQUEST,
  CREATE_FUNCTION_SUCCESS,
  CREATE_FUNCTION_ERROR,
} from 'containers/FunctionsPage/constants';

function* createFunction(action) {
  try {
    yield call(postFunction, action.fn);

    yield put({ type: CREATE_FUNCTION_SUCCESS, data: action.fn });

    // TODO if function is created successfully, jump to the homepage
    // the following code works, but not sure it is the best solution
    browserHistory.push('/');
  } catch (error) {
    yield put({ type: CREATE_FUNCTION_ERROR, error });
  }
}

export function* createFunctionSaga() {
  const watcher = yield takeLatest(CREATE_FUNCTION_REQUEST, createFunction);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  createFunctionSaga,
];
