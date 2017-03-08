/**
*
* TriggerHttpCreateForm
*
*/

import React from 'react';
// import styled from 'styled-components';

class TriggerHttpCreateForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      urlpattern: '/',
      method: 'GET',
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
          <label htmlFor="triggerHttpCreateMethod">Method</label>
          <select className="form-control" id="triggerHttpCreateMethod" name="method" onChange={this.onChange} >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="triggerHttpCreatePath">Path</label>
          <input type="text" className="form-control" id="triggerHttpCreatePath" name="urlpattern" onChange={this.onChange} />
        </div>
        <button className="btn btn-default" onClick={this.onTriggerCreate} >Add</button>
      </form>
    );
  }
}

TriggerHttpCreateForm.propTypes = {
  onCreate: React.PropTypes.func,
};

export default TriggerHttpCreateForm;
