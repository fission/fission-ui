/*
 *
 * BenchmarksListPage actions
 *
 */

import {
  LOAD_CONFIGS_REQUEST,
  UPDATE_CONFIG_REQUEST,
  GET_CONFIG_REQUEST,
  CREATE_CONFIG_REQUEST,
  DELETE_CONFIG_REQUEST,
} from 'containers/BenchmarksPage/constants';

export function removeConfigAction(config) {
  return {
    type: DELETE_CONFIG_REQUEST,
    config,
  };
}
export function updateConfigAction(config) {
  return {
    type: UPDATE_CONFIG_REQUEST,
    config,
  };
}
export function createConfigAction(config) {
  return {
    type: CREATE_CONFIG_REQUEST,
    config,
  };
}
export function getConfigAction(name) {
  return {
    type: GET_CONFIG_REQUEST,
    name,
  };
}
export function loadConfigsAction() {
  return {
    type: LOAD_CONFIGS_REQUEST,
  };
}
