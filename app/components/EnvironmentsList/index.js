/**
*
* EnvironmentsList
*
*/

import React, { PropTypes } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorIndicator from 'components/ErrorIndicator';
import EnvironmentsListItem from 'components/EnvironmentsListItem';

// import styled from 'styled-components';

function EnvironmentsList({ loading, error, environments, onRemove }) {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error !== false) {
    return <ErrorIndicator error={error} />;
  }
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Environment name</th>
          <th>Docker image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          environments.map((item, index) => (
            <EnvironmentsListItem item={item} key={`environment-${index}`} onRemove={() => { onRemove(item); }} />
          ))
        }
      </tbody>
    </table>
  );
}

EnvironmentsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  environments: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onRemove: PropTypes.func,
};

export default EnvironmentsList;
