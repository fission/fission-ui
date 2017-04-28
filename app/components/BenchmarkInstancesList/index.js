/**
*
* BenchmarkInstancesList
*
*/

import React, { PropTypes } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorIndicator from 'components/ErrorIndicator';
import BenchmarkInstanceListItem from 'containers/BenchmarkInstanceListItem';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';

function BenchmarkInstancesList({ loading, error, items, onRemove, onRun, onStop }) {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error !== false) {
    return <ErrorIndicator errors={[error.response.data]} />;
  }
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th><FormattedMessage {...commonMessages.name} /></th>
          <th><FormattedMessage {...commonMessages.status} /></th>
          <th><FormattedMessage {...commonMessages.action} /></th>
        </tr>
      </thead>
      <tbody>
        {
          items.map((item, index) => (
            <BenchmarkInstanceListItem
              item={item}
              key={`instance-${index}`}
              onRemove={() => { onRemove(item); }}
              onRun={() => { onRun(item); }}
              onStop={() => { onStop(item); }}
            />
          ))
        }
      </tbody>
    </table>
  );
}

BenchmarkInstancesList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onRemove: PropTypes.func,
  onRun: PropTypes.func,
  onStop: PropTypes.func,
};

export default BenchmarkInstancesList;
