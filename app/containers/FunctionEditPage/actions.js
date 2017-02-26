import {
  GET_FUNCTION_REQUEST,
} from 'containers/FunctionsPage/constants';


export function getFunctionAction(name) {
  return {
    type: GET_FUNCTION_REQUEST,
    name,
  };
}
