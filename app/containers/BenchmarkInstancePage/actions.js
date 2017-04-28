/*
 *
 * BenchmarksListPage actions
 *
 */

import {
  GET_INSTANCE_REQUEST,
} from 'containers/BenchmarksPage/constants';

export function getInstanceAction(name) {
  return {
    type: GET_INSTANCE_REQUEST,
    name,
  };
}

