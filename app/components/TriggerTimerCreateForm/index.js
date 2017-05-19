/**
*
* TriggerTimerCreateForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';

class TriggerTimerCreateForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      cron: '',
      description: '',
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
          <label htmlFor="triggerTimerCreateCron"><FormattedMessage {...commonMessages.cron} /></label>
          <input type="text" className="form-control" id="triggerTimerCreateCron" name="cron" onChange={this.onChange} />
        </div>
        <button className="btn btn-default" onClick={this.onTriggerCreate} ><FormattedMessage {...commonMessages.add} /></button>
      </form>
    );
  }
}

TriggerTimerCreateForm.propTypes = {
  onCreate: React.PropTypes.func,
};

export default TriggerTimerCreateForm;
