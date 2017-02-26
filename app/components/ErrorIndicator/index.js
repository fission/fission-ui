/**
*
* ErrorIndicator
*
*/

import React, { PropTypes } from 'react';

// import styled from 'styled-components';

function ErrorIndicator({ error }) {
  return (
    <h3> Error: {error.response.data } </h3>
  );
}

ErrorIndicator.propTypes = {
  error: PropTypes.any,
};

export default ErrorIndicator;
