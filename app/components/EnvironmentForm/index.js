/**
*
* EnvironmentForm
*
*/

import React from 'react';
import { Link } from 'react-router';

// import styled from 'styled-components';

class EnvironmentForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { environment, onSave, onChange, nameEditable, onSelectSample } = this.props;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="formEnvironmentName">Name</label>
          { nameEditable ? (
            <input type="text" className="form-control" id="formEnvironmentName" name="name" value={environment.name} onChange={onChange} />
          ) : (
            <input type="text" className="form-control" id="formEnvironmentName" readOnly name="name" value={environment.name} onChange={onChange} />
          )
          }
        </div>
        <div className="form-group">
          <label htmlFor="formEnvironmentImage">Docker image</label>
          <input type="text" className="form-control" id="formEnvironmentImage" name="image" value={environment.image} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="formEnvironmentSample">Choose sample</label>
          <select className="form-control" onChange={onSelectSample}>
            <option value="blank" />
            <option value="node">Node</option>
            <option value="python">Python</option>
          </select>
        </div>
        <a className="btn btn-primary" onClick={onSave}>Save</a> { ' ' }
        <Link to="/environments" className="btn btn-default">Cancel</Link>

      </form>
    );
  }
}

EnvironmentForm.propTypes = {
  environment: React.PropTypes.object,
  onSave: React.PropTypes.func,
  onChange: React.PropTypes.func.isRequired,
  nameEditable: React.PropTypes.bool,
  onSelectSample: React.PropTypes.func.isRequired,
};

export default EnvironmentForm;
