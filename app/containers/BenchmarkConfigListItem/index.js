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
    const { item, onRemove } = this.props;
    const { name } = item.metadata;
    return (
      <tr>
        <td>{ name }</td>
        <td>
          <Link className="btn btn-info" to={`/benchmarks/configs/${name}/instances`}><FormattedMessage {...commonMessages.instance} /></Link>{ ' ' }
          <Link className="btn btn-primary" to={`/benchmarks/configs/${name}`}><FormattedMessage {...commonMessages.edit} /></Link>{ ' ' }
          <a onClick={onRemove} className="btn btn-danger"><FormattedMessage {...commonMessages.delete} /></a>
        </td>
      </tr>
    );
  }
}

BenchmarkConfigListItem.propTypes = {
  item: PropTypes.object,
  onRemove: PropTypes.func,
};

export default BenchmarkConfigListItem;
