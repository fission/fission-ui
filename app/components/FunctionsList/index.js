/**
*
* FunctionsList
*
*/

import React, { PropTypes } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import FunctionListItem from 'containers/FunctionListItem';
// import styled from 'styled-components';


function FunctionsList({ loading, error, items, onRemove }) {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error !== false) {
    return <h3>{ error }</h3>;
  }
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Environment</th>
          <th>Http endpoints</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map((item, index) => (
            <FunctionListItem item={item} key={`function-${index}`} onRemove={() => { onRemove(item); }} />
          ))
        }
      </tbody>
    </table>
  );
}

FunctionsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onRemove: PropTypes.func,
};

export default FunctionsList;
