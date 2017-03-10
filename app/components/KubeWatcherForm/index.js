/**
*
* KubeWatcherForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import KubeWatcherItemForm from 'components/KubeWatcherItemForm';
import KubeWatcherCreateForm from 'components/KubeWatcherCreateForm';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';
import messages from './messages';

class KubeWatcherForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { watchers, onRemove, onCreate } = this.props;
    return (
      <div>
        <h3><FormattedMessage {...messages.headerkubewatcher} /></h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th><FormattedMessage {...commonMessages.namespace} /></th>
              <th><FormattedMessage {...commonMessages.objtype} /></th>
              <th><FormattedMessage {...commonMessages.labelselector} /></th>
              <th><FormattedMessage {...commonMessages.action} /></th>
            </tr>
          </thead>
          <tbody>
            {
              watchers.map((item, index) => (
                <KubeWatcherItemForm watcher={item} key={`watchers-${index}`} onRemove={() => { onRemove(item); }} />
              ))
            }
          </tbody>
        </table>
        <KubeWatcherCreateForm onCreate={onCreate} />
      </div>
    );
  }
}

KubeWatcherForm.propTypes = {
  watchers: React.PropTypes.array,
  onRemove: React.PropTypes.func,
  onCreate: React.PropTypes.func,
};

export default KubeWatcherForm;
