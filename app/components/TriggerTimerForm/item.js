/**
*
* TriggerHttpItemForm
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';
// import styled from 'styled-components';


class Item extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { trigger, onRemove } = this.props;
    return (
      <tr>
        <td>{trigger.cron}</td>
        <td>{trigger.description}</td>
        <td>
          <a className="btn btn-danger" onClick={onRemove}><FormattedMessage {...commonMessages.delete} /></a> { ' ' }
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  trigger: React.PropTypes.object,
  onRemove: React.PropTypes.func,
};

export default Item;
