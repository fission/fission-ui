/*
 *
 * EnvironmentsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_FUNCTIONS_REQUEST,
  LOAD_FUNCTIONS_SUCCESS,
  LOAD_FUNCTIONS_ERROR,
  DELETE_FUNCTION_SUCCESS,
  LOAD_TRIGGERSHTTP_REQUEST,
  LOAD_TRIGGERSHTTP_SUCCESS,
  LOAD_TRIGGERSHTTP_ERROR,
} from './constants';

const initialState = fromJS({ functions: [], triggersHttp: [], functionLoading: false, triggerHttpLoading: false, error: false });

function functionsReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_FUNCTION_SUCCESS:
      return state.set('functions', state.get('functions').filter((e) => e.metadata.name !== action.environment.name));
    case LOAD_FUNCTIONS_REQUEST:
      return state
        .set('functionLoading', true)
        .set('error', false)
        .set('functions', []);
    case LOAD_TRIGGERSHTTP_REQUEST:
      return state
        .set('triggerHttpLoading', true)
        .set('error', false)
        .set('triggersHttp', []);
    case LOAD_FUNCTIONS_ERROR:
    case LOAD_TRIGGERSHTTP_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_TRIGGERSHTTP_SUCCESS:
      return state
        .set('triggersHttp', action.data)
        .set('triggerHttpLoading', false);
    case LOAD_FUNCTIONS_SUCCESS:
      return state
        .set('functions', action.data)
        .set('functionLoading', false);
    default:
      return state;
  }
}

export default functionsReducer;
