/**
*
* BenchmarkConfigsList
*
*/

import React, { PropTypes } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorIndicator from 'components/ErrorIndicator';
import BenchmarkConfigListItem from 'containers/BenchmarkConfigListItem';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';

function BenchmarkConfigsList({ loading, error, items, onRemove }) {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error !== false) {
    return <ErrorIndicator errors={[error.response.data.message]} />;
  }
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th><FormattedMessage {...commonMessages.name} /></th>
          <th><FormattedMessage {...commonMessages.action} /></th>
        </tr>
      </thead>
      <tbody>
        {
          items.map((item, index) => (
            <BenchmarkConfigListItem item={item} key={`config-${index}`} onRemove={() => { onRemove(item); }} />
          ))
        }
      </tbody>
    </table>
  );
}

BenchmarkConfigsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onRemove: PropTypes.func,
};

export default BenchmarkConfigsList;
