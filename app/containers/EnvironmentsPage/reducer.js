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
  CREATE_ENVIRONMENT_REQUEST,
  CREATE_ENVIRONMENT_SUCCESS,
  CREATE_ENVIRONMENT_ERROR,
  DELETE_ENVIRONMENT_SUCCESS,
  GET_ENVIRONMENT_SUCCESS,
  GET_ENVIRONMENT_REQUEST,
  GET_ENVIRONMENT_ERROR,
  EDIT_ENVIRONMENT_SUCCESS,
} from './constants';

const initialState = fromJS({ environments: [], loading: false, error: false });

function environmentsReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_ENVIRONMENT_SUCCESS:
      return state.set('environments', state.get('environments').map((env) => env.metadata.name === action.data.metadata.name ? action.data : env));
    case GET_ENVIRONMENT_REQUEST:
      return state
        .set('loading', true)
        .set('error', false);
    case GET_ENVIRONMENT_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case GET_ENVIRONMENT_SUCCESS:
      return state
        .update('environments', (env) => { env.push(action.data); return env; })
        .set('loading', false);
    case CREATE_ENVIRONMENT_REQUEST:
      return state
        .set('loading', true)
        .set('error', false);
    case CREATE_ENVIRONMENT_SUCCESS:
      return state
        .update('environments', (env) => { env.push(action.data); return env; })
        .set('loading', false)
        .set('error', false);
    case CREATE_ENVIRONMENT_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
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
