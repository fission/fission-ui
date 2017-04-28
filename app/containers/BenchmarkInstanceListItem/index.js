/*
 *
 * BenchmarkConfigListItem
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import commonMessages from 'messages';

export class BenchmarkConfigListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { item, onRun, onStop, onRemove } = this.props;
    const { name, labels } = item.metadata;
    const { status } = item.spec;
    return (
      <tr>
        <td>{ name }</td>
        <td>{ status }</td>
        <td>
          <Link className="btn btn-info" to={`/benchmarks/configs/${labels.config}/instances/${name}`}>
            <FormattedMessage {...commonMessages.report} />
          </Link>{ ' ' }
          <a onClick={onRun} className="btn btn-primary" disabled={status !== 'created'}><FormattedMessage {...commonMessages.run} /></a>{ ' ' }
          <a onClick={onStop} className="btn btn-warning" disabled={status !== 'running'}><FormattedMessage {...commonMessages.stop} /></a>{ ' ' }
          <a onClick={onRemove} className="btn btn-danger"><FormattedMessage {...commonMessages.delete} /></a>
        </td>
      </tr>
    );
  }
}

BenchmarkConfigListItem.propTypes = {
  item: PropTypes.object,
  onRemove: PropTypes.func,
  onRun: PropTypes.func,
  onStop: PropTypes.func,
};

export default BenchmarkConfigListItem;
