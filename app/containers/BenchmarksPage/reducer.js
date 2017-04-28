/*
 *
 * BenchmarksPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_CONFIGS_REQUEST,
  LOAD_CONFIGS_SUCCESS,
  LOAD_CONFIGS_ERROR,
  CREATE_CONFIG_REQUEST,
  CREATE_CONFIG_SUCCESS,
  CREATE_CONFIG_ERROR,
  GET_CONFIG_REQUEST,
  GET_CONFIG_SUCCESS,
  GET_CONFIG_ERROR,
  DELETE_CONFIG_REQUEST,
  DELETE_CONFIG_SUCCESS,
  DELETE_CONFIG_ERROR,
  UPDATE_CONFIG_REQUEST,
  UPDATE_CONFIG_SUCCESS,
  UPDATE_CONFIG_ERROR,

  LOAD_INSTANCES_REQUEST,
  LOAD_INSTANCES_SUCCESS,
  LOAD_INSTANCES_ERROR,
  CREATE_INSTANCE_REQUEST,
  CREATE_INSTANCE_SUCCESS,
  CREATE_INSTANCE_ERROR,
  GET_INSTANCE_REQUEST,
  GET_INSTANCE_SUCCESS,
  GET_INSTANCE_ERROR,
  DELETE_INSTANCE_REQUEST,
  DELETE_INSTANCE_SUCCESS,
  DELETE_INSTANCE_ERROR,
  UPDATE_INSTANCE_REQUEST,
  UPDATE_INSTANCE_SUCCESS,
  UPDATE_INSTANCE_ERROR,
} from './constants';

const initialState = fromJS({
  configs: [],
  instances: [],
  loading: false,
  error: false,
});

function benchmarksReducer(state = initialState, action) {
  switch (action.type) {
    // loading requests
    case LOAD_CONFIGS_REQUEST:
    case LOAD_INSTANCES_REQUEST:
    case GET_CONFIG_REQUEST:
    case GET_INSTANCE_REQUEST:
    case UPDATE_CONFIG_REQUEST:
    case UPDATE_INSTANCE_REQUEST:
    case CREATE_CONFIG_REQUEST:
    case CREATE_INSTANCE_REQUEST:
    case DELETE_CONFIG_REQUEST:
    case DELETE_INSTANCE_REQUEST:
      return state
        .set('loading', true)
        .set('error', false);

    // request error
    case LOAD_CONFIGS_ERROR:
    case LOAD_INSTANCES_ERROR:
    case GET_CONFIG_ERROR:
    case GET_INSTANCE_ERROR:
    case UPDATE_CONFIG_ERROR:
    case UPDATE_INSTANCE_ERROR:
    case CREATE_CONFIG_ERROR:
    case CREATE_INSTANCE_ERROR:
    case DELETE_CONFIG_ERROR:
    case DELETE_INSTANCE_ERROR:
      return state
        .set('loading', false)
        .set('error', fromJS(action.error));

    // request success
    case LOAD_CONFIGS_SUCCESS:
      return loadListSuccessHandler('configs', state, action);
    case LOAD_INSTANCES_SUCCESS:
      return loadListSuccessHandler('instances', state, action);
    case GET_CONFIG_SUCCESS:
    case UPDATE_CONFIG_SUCCESS:
      return getItemSuccessHandler('configs', state, action);
    case GET_INSTANCE_SUCCESS:
    case UPDATE_INSTANCE_SUCCESS:
      return getItemSuccessHandler('instances', state, action);
    case CREATE_CONFIG_SUCCESS:
      return createItemSuccessHandler('configs', state, action);
    case CREATE_INSTANCE_SUCCESS:
      return createItemSuccessHandler('instances', state, action);
    case DELETE_CONFIG_SUCCESS:
      return deleteItemSuccessHandler('configs', state, action);
    case DELETE_INSTANCE_SUCCESS:
      return deleteItemSuccessHandler('instances', state, action);

    default:
      return state;
  }
}

function deleteItemSuccessHandler(type, state, action) {
  return state
    .set('error', false)
    .set('loading', false)
    .update(type, (arr) => arr.filter((e) => e.getIn(['metadata', 'name']) !== action.data.metadata.name));
}

function createItemSuccessHandler(type, state, action) {
  return state
    .set('error', false)
    .set('loading', false)
    .update(type, (arr) => arr.push(fromJS(action.data)));
}

function loadListSuccessHandler(type, state, action) {
  return state
    .set(type, fromJS(action.data))
    .set('error', false)
    .set('loading', false);
}

function getItemSuccessHandler(type, state, action) {
  const alreadyExist = state.get(type).filter((e) => e.getIn(['metadata', 'name']) === action.data.metadata.name);
  if (alreadyExist.size === 1) {
    return state
      .update(type, (arr) => arr.map((item) => item.getIn(['metadata', 'name']) === action.data.metadata.name ? fromJS(action.data) : item))
      .set('error', false)
      .set('loading', false);
  }
  return state
    .set(type, fromJS([action.data]))
    .set('error', false)
    .set('loading', false);
}

export default benchmarksReducer;
