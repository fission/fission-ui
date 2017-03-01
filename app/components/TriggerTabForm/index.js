/**
*
* TriggerTabForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import TriggerHttpForm from 'components/TriggerHttpForm';

class TriggerTabForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { triggers, onRemove, onCreate } = this.props;

    return (
      <div>
        <TriggerHttpForm triggers={triggers.triggersHttp} onRemove={onRemove} onCreate={onCreate} />
      </div>
    );
  }
}

TriggerTabForm.propTypes = {
  triggers: React.PropTypes.object,
  onRemove: React.PropTypes.func,
  onCreate: React.PropTypes.func,
};

export default TriggerTabForm;
