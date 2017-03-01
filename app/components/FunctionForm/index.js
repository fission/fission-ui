/**
*
* FunctionForm
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';
import FunctionTabForm from 'components/FunctionTabForm';
import TriggerTabForm from 'components/TriggerTabForm';

class FunctionForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'function',
      environments: props.environments,
      item: props.item,
    };
    this.onTabChange = this.onTabChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.environments.length !== this.state.environments.length) {
      this.state.environments = nextProps.environments;
    }
    if (nextProps.item.length !== this.state.item) {
      this.state.item = nextProps.item;
    }
  }

  onTabChange(tabName) {
    this.setState({ currentTab: tabName });
  }

  render() {
    const { item, currentTab, environments } = this.state;
    const { onChange, onHttpTriggerRemove, nameEditable, onCodeChange } = this.props;

    return (
      <div>
        <ul className="nav nav-tabs">
          <li role="presentation" className={currentTab === 'function' ? 'active' : ''}><a onClick={() => this.onTabChange('function')}>Function</a></li>
          <li role="presentation" className={currentTab === 'trigger' ? 'active' : ''}><a onClick={() => this.onTabChange('trigger')}>Triggers</a></li>
        </ul>
        <div style={{ display: currentTab === 'function' ? 'block' : 'none' }}>
          <FunctionTabForm item={item} environments={environments} onChange={onChange} nameEditable={nameEditable} onCodeChange={onCodeChange} />
        </div>
        <div style={{ display: currentTab === 'trigger' ? 'block' : 'none' }}>
          <TriggerTabForm triggers={{ triggersHttp: item.triggersHttp }} onChange={onChange} onRemove={onHttpTriggerRemove} />
        </div>
      </div>
    );
  }
}

FunctionForm.propTypes = {
  environments: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  item: PropTypes.object,
  onChange: PropTypes.func,
  onHttpTriggerRemove: PropTypes.func,
  nameEditable: PropTypes.bool,
  onCodeChange: PropTypes.func,
};

export default FunctionForm;
