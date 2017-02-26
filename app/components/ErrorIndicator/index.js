/**
*
* ErrorIndicator
*
*/

import React, { PropTypes } from 'react';

// import styled from 'styled-components';

function ErrorIndicator({ error }) {
  return (
    <div className="alert alert-danger">Error: { error.response.data }</div>
  );
}

ErrorIndicator.propTypes = {
  error: PropTypes.any,
};

export default ErrorIndicator;
