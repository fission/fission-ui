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
    const { name, dockerImage, onSubmit } = this.props;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={name} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Docker image</label>
          <input type="text" className="form-control" id="exampleInputPassword1" value={dockerImage} />
        </div>
        <a className="btn btn-primary" onClick={onSubmit}>Save</a> { ' ' }
        <Link to="/environments" className="btn btn-default">Cancel</Link>

      </form>
    );
  }
}

EnvironmentForm.propTypes = {
  onSubmit: React.PropTypes.func,
  dockerImage: React.PropTypes.string,
  name: React.PropTypes.string,
};

export default EnvironmentForm;
