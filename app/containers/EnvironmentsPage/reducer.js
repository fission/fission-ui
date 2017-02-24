/*
 *
 * EnvironmentsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_ENVIRONMENTS_REQUEST,
  LOAD_ENVIRONMENTS_SUCCESS,
  LOAD_ENVIRONMENTS_ERROR,
} from './constants';

const initialState = fromJS({ environments: [], loading: false, error: false });

function environmentsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ENVIRONMENTS_REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('environments', []);
    case LOAD_ENVIRONMENTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_ENVIRONMENTS_SUCCESS:
      return state
        .set('environments', action.data)
        .set('loading', false);
    default:
      return state;
  }
}

export default environmentsReducer;
