/*
 *
 * EnvironmentCreatePage actions
 *
 */

import {
  CREATE_ENVIRONMENT_REQUEST,
} from 'containers/EnvironmentsPage/constants';

export function createEnvironmentAction(name, dockerImage) {
  return {
    type: CREATE_ENVIRONMENT_REQUEST,
    name,
    dockerImage,
  };
}
