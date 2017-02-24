import { takeLatest, call, put } from 'redux-saga/effects';
import { getEnvironments } from 'utils/api';
import { LOAD_ENVIRONMENTS_REQUEST, LOAD_ENVIRONMENTS_SUCCESS, LOAD_ENVIRONMENTS_ERROR } from 'containers/EnvironmentsPage/constants';

function* loadEnvironments() {
  try {
    const data = yield call(getEnvironments);
    yield put({ type: LOAD_ENVIRONMENTS_SUCCESS, data });
  } catch (error) {
    yield put({ type: LOAD_ENVIRONMENTS_ERROR, error });
  }
}

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  yield takeLatest(LOAD_ENVIRONMENTS_REQUEST, loadEnvironments);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
