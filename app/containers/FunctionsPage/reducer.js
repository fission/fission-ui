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
  DELETE_FUNCTION_REQUEST,
  DELETE_FUNCTION_SUCCESS,
  DELETE_FUNCTION_ERROR,
  LOAD_TRIGGERSHTTP_REQUEST,
  LOAD_TRIGGERSHTTP_SUCCESS,
  LOAD_TRIGGERSHTTP_ERROR,
  GET_FUNCTION_REQUEST,
  GET_FUNCTION_ERROR,
  GET_FUNCTION_SUCCESS,
  DELETE_TRIGGERHTTP_REQUEST,
  DELETE_TRIGGERHTTP_SUCCESS,
  DELETE_TRIGGERHTTP_ERROR,
} from './constants';

const initialState = fromJS({ functions: [], triggersHttp: [], functionLoading: false, triggerHttpLoading: false, error: false });

function functionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FUNCTION_REQUEST:
      return state
        .set('functionLoading', true)
        .set('error', false);
    case GET_FUNCTION_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('functionLoading', false);
    case GET_FUNCTION_SUCCESS:
      return getFunctionSuccessHandler(state, action);
    case DELETE_FUNCTION_SUCCESS:
      return state
        .set('functionLoading', false)
        .set('functions', state.get('functions').filter((e) => e.getIn(['metadata', 'name']) !== action.function.name));
    case DELETE_FUNCTION_REQUEST:
      return state
        .set('functionLoading', true)
        .set('error', false);
    case LOAD_FUNCTIONS_REQUEST:
      return state
        .set('functionLoading', true)
        .set('error', false)
        .set('functions', fromJS([]));
    case LOAD_TRIGGERSHTTP_REQUEST:
      return state
        .set('triggerHttpLoading', true)
        .set('error', false)
        .set('triggersHttp', fromJS([]));
    case LOAD_FUNCTIONS_ERROR:
    case DELETE_FUNCTION_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('functionLoading', false);
    case LOAD_TRIGGERSHTTP_SUCCESS:
      return state
        .set('triggersHttp', fromJS(action.data))
        .set('triggerHttpLoading', false);
    case LOAD_FUNCTIONS_SUCCESS:
      return state
        .set('functions', fromJS(action.data))
        .set('functionLoading', false);
    case DELETE_TRIGGERHTTP_REQUEST:
      return state.set('triggerHttpLoading', true);
    case DELETE_TRIGGERHTTP_SUCCESS:
      return state
        .set('triggerHttpLoading', false)
        .update('triggersHttp', (triggers) => triggers.filter((e) => e.getIn(['metadata', 'name']) !== action.data.metadata.name));
    case LOAD_TRIGGERSHTTP_ERROR:
    case DELETE_TRIGGERHTTP_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('triggerHttpLoading', false);
    default:
      return state;
  }
}

function getFunctionSuccessHandler(state, action) {
  const functionAlreadyExist = state.get('functions').filter((e) => e.getIn(['metadata', 'name']) !== action.data.name);
  if (functionAlreadyExist.size === 1) {
    return state
      .update('functions', (fns) => fns.map((fn) => fn.getIn(['metadata', 'name']) === action.data.metadata.name ? fromJS(action.data) : fn))
      .set('functionLoading', false);
  }
  return state
    .set('functions', fromJS([action.data]))
    .set('functionLoading', false);
}

export default functionsReducer;
