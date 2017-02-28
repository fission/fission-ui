import {
  GET_FUNCTION_REQUEST,
  LOAD_TRIGGERSHTTP_REQUEST,
  DELETE_TRIGGERHTTP_REQUEST,
} from 'containers/FunctionsPage/constants';


export function getFunctionAction(name) {
  return {
    type: GET_FUNCTION_REQUEST,
    name,
  };
}

export function loadTriggersHttpAction() {
  return {
    type: LOAD_TRIGGERSHTTP_REQUEST,
  };
}

export function deleteTriggerHttpAction(trigger) {
  return {
    type: DELETE_TRIGGERHTTP_REQUEST,
    trigger,
  };
}
