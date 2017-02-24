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
  CREATE_ENVIRONMENT_SUCCESS,
  DELETE_ENVIRONMENT_SUCCESS,
} from './constants';

const initialState = fromJS({ environments: [], loading: false, error: false });

function environmentsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ENVIRONMENT_SUCCESS:
      state.update('environments', (env) => env.push(action.data));
      return state;
    case DELETE_ENVIRONMENT_SUCCESS:
      return state.set('environments', state.get('environments').filter((e) => e.metadata.name !== action.environment.name));
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
