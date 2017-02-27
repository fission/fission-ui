import {
  GET_FUNCTION_REQUEST,
  LOAD_TRIGGERSHTTP_REQUEST,
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
