/**
*
* ErrorIndicator
*
*/

import React, { PropTypes } from 'react';

// import styled from 'styled-components';

function ErrorIndicator({ error }) {
  let errorMessage;
  if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = error.response.data;
  }
  return (
    <div className="alert alert-danger" dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
  );
}

ErrorIndicator.propTypes = {
  error: PropTypes.any,
};

export default ErrorIndicator;
