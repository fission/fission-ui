/*
 *
 * BenchmarksListPage actions
 *
 */

import {
  UPDATE_CONFIG_REQUEST,
  GET_CONFIG_REQUEST,
  CREATE_CONFIG_REQUEST,
} from 'containers/BenchmarksPage/constants';

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
