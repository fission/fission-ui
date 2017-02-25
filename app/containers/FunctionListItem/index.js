/*
 *
 * FunctionListItem
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import messages from './messages';

export class FunctionListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { item, onRemove } = this.props;
    return (
      <tr>
        <td>{ item.name }</td>
        <td><Link to={`/environments/${item.environment}`}>{ item.environment }</Link></td>
        <td>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {
              item.triggersHttp.map((trigger, index) => (
                <li key={`triggerHttp-${index}`}>
                  <span className="label label-info">{trigger.method}</span>
                  {trigger.urlpattern}
                  <span className="label label-danger"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></span>
                </li>
              ))
            }
            <li><span className="label label-success"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add</span></li>
          </ul>
        </td>
        <td>
          <a onClick={onRemove} className="btn btn-danger"><FormattedMessage {...messages.delete} /></a>
        </td>
      </tr>
    );
  }
}

FunctionListItem.propTypes = {
  item: PropTypes.object,
  onRemove: PropTypes.func,
};

export default FunctionListItem;
