/**
*
* FunctionsList
*
*/

import React, { PropTypes } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorIndicator from 'components/ErrorIndicator';
import FunctionListItem from 'containers/FunctionListItem';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';

function FunctionsList({ loading, error, items, onRemove }) {
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
          <th><FormattedMessage {...commonMessages.name} /></th>
          <th><FormattedMessage {...commonMessages.environment} /></th>
          <th><FormattedMessage {...commonMessages.trigger} /></th>
          <th><FormattedMessage {...commonMessages.action} /></th>
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
