/*
 *
 * EnvironmentsListPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_ENVIRONMENTS_REQUEST,
} from 'containers/EnvironmentsPage/constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function loadEnvironmentAction() {
  return {
    type: LOAD_ENVIRONMENTS_REQUEST,
  };
}
