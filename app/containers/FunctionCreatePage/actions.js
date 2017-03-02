import {
  CREATE_FUNCTION_REQUEST,
} from 'containers/FunctionsPage/constants';

export function createFunctionAction(fn) {
  console.log('create function action');
  return {
    type: CREATE_FUNCTION_REQUEST,
    fn,
  };
}
