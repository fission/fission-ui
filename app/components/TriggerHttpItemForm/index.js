/**
*
* TriggerHttpItemForm
*
*/

import React from 'react';
// import styled from 'styled-components';


class TriggerHttpItemForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { trigger, onRemove } = this.props;
    return (
      <tr>
        <td>{trigger.method}</td>
        <td>{trigger.urlpattern}</td>
        <td><a className="btn btn-danger" onClick={onRemove}>Delete</a></td>
      </tr>
    );
  }
}

TriggerHttpItemForm.propTypes = {
  trigger: React.PropTypes.object,
  onRemove: React.PropTypes.func,
};

export default TriggerHttpItemForm;
