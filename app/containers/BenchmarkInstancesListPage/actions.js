/*
 *
 * BenchmarkInstancesListPage actions
 *
 */

import {
  LOAD_INSTANCES_REQUEST,
  UPDATE_INSTANCE_REQUEST,
  GET_INSTANCE_REQUEST,
  CREATE_INSTANCE_REQUEST,
  DELETE_INSTANCE_REQUEST,
} from 'containers/BenchmarksPage/constants';

export function removeInstanceAction(instance) {
  return {
    type: DELETE_INSTANCE_REQUEST,
    instance,
  };
}
export function updateInstanceAction(ins, status) {
  const instance = Object.assign({}, ins);
  instance.spec.status = status;
  return {
    type: UPDATE_INSTANCE_REQUEST,
    instance,
  };
}
export function createInstanceAction(instance) {
  return {
    type: CREATE_INSTANCE_REQUEST,
    instance,
  };
}
export function getInstanceAction(name) {
  return {
    type: GET_INSTANCE_REQUEST,
    name,
  };
}
export function loadInstancesAction() {
  return {
    type: LOAD_INSTANCES_REQUEST,
  };
}
