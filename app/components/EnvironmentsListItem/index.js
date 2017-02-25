/**
*
* EnvironmentsListItem
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import messages from './messages';

function EnvironmentsListItem({ item, onRemove }) {
  return (
    <tr>
      <td>{ item.name }</td>
      <td>{ item.image }</td>
      <td>
        <Link to={`/environments/${item.name}`} className="btn btn-success"><FormattedMessage {...messages.edit} /></Link>{ ' ' }
        <a onClick={onRemove} className="btn btn-danger"><FormattedMessage {...messages.delete} /></a>
      </td>
    </tr>
  );
}

EnvironmentsListItem.propTypes = {
  item: React.PropTypes.object,
  onRemove: React.PropTypes.func,
};

export default EnvironmentsListItem;
