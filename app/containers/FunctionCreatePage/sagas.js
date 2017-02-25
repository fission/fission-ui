// import { take, call, put, select } from 'redux-saga/effects';
import { take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

// Individual exports for testing
export function* defaultSaga() {
  yield take(LOCATION_CHANGE); // todo not finished
}

// All sagas to be loaded
export default [
  defaultSaga,
];
