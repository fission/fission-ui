/**
*
* KubeWatcherCreateForm
*
*/

import React from 'react';
// import styled from 'styled-components';

class KubeWatcherCreateForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      namespace: 'default',
      objtype: 'pod',
      labelselector: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onWatcherCreate = this.onWatcherCreate.bind(this);
  }

  onChange(event) {
    const target = event.target;
    this.state[target.name] = target.value;
  }

  onWatcherCreate(event) {
    event.preventDefault();
    const { onCreate } = this.props;
    onCreate(this.state);
  }

  render() {
    const { namespace, objtype, labelselector } = this.state;
    return (
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="watcherCreateNamespace">Namespace</label>
          <input type="text" className="form-control" id="watcherCreateNamespace" defaultValue={namespace} name="namespace" onChange={this.onChange} />
        </div>

        <div className="form-group">
          <label htmlFor="watcherCreateObjType">ObjType</label>
          <input type="text" className="form-control" id="watcherCreateObjType" defaultValue={objtype} name="objtype" onChange={this.onChange} />
        </div>

        <div className="form-group">
          <label htmlFor="watcherCreateLabelSelector">LabelSelector</label>
          <input type="text" className="form-control" id="watcherCreateLabelSelector" defaultValue={labelselector} name="labelselector" onChange={this.onChange} />
        </div>
        <button className="btn btn-default" onClick={this.onWatcherCreate} >Add</button>
      </form>
    );
  }
}

KubeWatcherCreateForm.propTypes = {
  onCreate: React.PropTypes.func,
};

export default KubeWatcherCreateForm;
