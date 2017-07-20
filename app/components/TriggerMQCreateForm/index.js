/**
*
* TriggerMQCreateForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';

class TriggerMQCreateForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      messageQueueType: 'nats-streaming',
      topic: '',
      respTopic: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onTriggerCreate = this.onTriggerCreate.bind(this);
  }

  onChange(event) {
    const target = event.target;
    this.state[target.name] = target.value;
  }

  onTriggerCreate(event) {
    event.preventDefault();
    const { onCreate } = this.props;
    onCreate(this.state);
  }

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="triggerMQCreateType"><FormattedMessage {...commonMessages.type} /></label>
          <input type="text" className="form-control" id="triggerMQCreateType" name="messageQueueType" defaultValue={this.state.messageQueueType} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="triggerMQCreateTopic"><FormattedMessage {...commonMessages.topic} /></label>
          <input type="text" className="form-control" id="triggerMQCreateTopic" name="topic" onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="triggerMQCreateRespTopic"><FormattedMessage {...commonMessages.respTopic} /></label>
          <input type="text" className="form-control" id="triggerMQCreateRespTopic" name="respTopic" onChange={this.onChange} />
        </div>
        <button className="btn btn-default" onClick={this.onTriggerCreate} ><FormattedMessage {...commonMessages.add} /></button>
      </form>
    );
  }
}

TriggerMQCreateForm.propTypes = {
  onCreate: React.PropTypes.func,
};

export default TriggerMQCreateForm;
