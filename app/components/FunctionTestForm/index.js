/**
*
* FunctionTestForm
*
*/

import React from 'react';

class FunctionTestForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { response } = this.props.functionTest;
    return (
      <div>
        <a className="btn btn-primary" onClick={this.props.onFunctionTest}>Test code</a>
        <div> response: { JSON.stringify(response) }</div>
      </div>
    );
  }
}

FunctionTestForm.propTypes = {
  functionTest: React.PropTypes.object,
  onFunctionTest: React.PropTypes.func.isRequired,
};

export default FunctionTestForm;
