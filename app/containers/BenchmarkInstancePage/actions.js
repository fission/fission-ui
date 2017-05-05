/*
 *
 * BenchmarksListPage actions
 *
 */

import {
  GET_INSTANCE_REQUEST,
  GET_CONFIG_REQUEST,
} from 'containers/BenchmarksPage/constants';

export function getInstanceAction(name) {
  return {
    type: GET_INSTANCE_REQUEST,
    name,
  };
}

export function getConfigAction(name) {
  return {
    type: GET_CONFIG_REQUEST,
    name,
  };
}

