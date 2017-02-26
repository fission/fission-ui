/**
*
* TriggerHttpCreateForm
*
*/

import React from 'react';
// import styled from 'styled-components';

class TriggerHttpCreateForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="triggerHttpCreateMethod">Method</label>
          <select className="form-control" id="triggerHttpCreateMethod">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="triggerHttpCreatePath">Path</label>
          <input type="text" className="form-control" id="triggerHttpCreatePath" />
        </div>
        <button className="btn btn-default">Add</button>
      </form>
    );
  }
}

TriggerHttpCreateForm.propTypes = {

};

export default TriggerHttpCreateForm;
