/**
*
* TriggerHttpForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import TriggerHttpItemForm from 'components/TriggerHttpItemForm';
import TriggerHttpCreateForm from 'components/TriggerHttpCreateForm';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class TriggerHttpForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { triggers, onRemove } = this.props;
    return (
      <div>
        <h3><FormattedMessage {...messages.headerhttptrigger} /></h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Method</th>
              <th>Path</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              triggers.map((item, index) => (
                <TriggerHttpItemForm trigger={item} key={`triggers-${index}`} onRemove={() => { onRemove(item); }} />
              ))
            }
          </tbody>
        </table>
        <TriggerHttpCreateForm />
      </div>
    );
  }
}

TriggerHttpForm.propTypes = {
  triggers: React.PropTypes.array,
  onRemove: React.PropTypes.func,
};

export default TriggerHttpForm;
