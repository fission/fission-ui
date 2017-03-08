/**
*
* KeyValueRow
*
*/

import React from 'react';

class KeyValueRow extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const pair = [this.props.thekey, this.props.thevalue];
    pair[e.target.name] = e.target.value;
    this.props.onChange(this.props.index, pair);
  }

  render() {
    const { index, thekey, thevalue } = this.props;
    return (
      <div>
        <input placeholder="key" value={thekey} name={0} onChange={this.onChange} />
        <input placeholder="value" value={thevalue} name={1} onChange={this.onChange} />
        <a className="btn btn-danger" onClick={() => this.props.onDelete(index)} >x</a>
      </div>
    );
  }
}

KeyValueRow.propTypes = {
  index: React.PropTypes.number.isRequired,
  thekey: React.PropTypes.string.isRequired,
  thevalue: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

export default KeyValueRow;
