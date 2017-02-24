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

function EnvironmentsListItem({ item }) {
  return (
    <tr>
      <td>{ item.name }</td>
      <td>{ item.image }</td>
      <td>
        <Link to={`/environments/${item.name}`} className="btn btn-success"><FormattedMessage {...messages.edit} /></Link>
        <Link to={`/environments/${item.name}/delete`} className="btn btn-danger"><FormattedMessage {...messages.delete} /></Link>
      </td>
    </tr>
  );
}

EnvironmentsListItem.propTypes = {
  item: React.PropTypes.object,
};

export default EnvironmentsListItem;
