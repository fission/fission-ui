import {
  LOAD_FUNCTIONS_REQUEST,
  LOAD_TRIGGERSHTTP_REQUEST,
  DELETE_FUNCTION_REQUEST,
} from 'containers/FunctionsPage/constants';


export function loadFunctionAction() {
  return {
    type: LOAD_FUNCTIONS_REQUEST,
  };
}

export function loadTriggersHttpAction() {
  return {
    type: LOAD_TRIGGERSHTTP_REQUEST,
  };
}

export function deleteFunctionAction(func, deleteHttpTriggers) {
  return {
    type: DELETE_FUNCTION_REQUEST,
    function: func,
    deleteHT: deleteHttpTriggers,
  };
}
