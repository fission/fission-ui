/*
 *
 * FunctionListItem
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import commonMessages from 'messages';
import messages from './messages';

export class FunctionListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { item, onRemove } = this.props;
    return (
      <tr>
        <td>{ item.name }</td>
        <td><Link to={`/environments/edit/${item.environment}`}>{ item.environment }</Link></td>
        <td>
          { item.triggersHttp.length > 0 && renderTriggersHttp(item) }
          { item.triggersTimer.length > 0 && renderTriggersTimer(item) }
          { item.triggersMQ.length > 0 && renderTriggersMQ(item) }
          { item.kubeWatchers.length > 0 && renderKubeWatchers(item) }
        </td>
        <td>
          <Link className="btn btn-primary" to={`/functions/edit/${item.name}`}><FormattedMessage {...commonMessages.edit} /></Link>
          { ' ' }
          <a onClick={onRemove} className="btn btn-danger"><FormattedMessage {...commonMessages.delete} /></a>
        </td>
      </tr>
    );
  }
}

function renderTriggersHttp(item) {
  return (
    <div>
      <Link to={`/functions/edit/${item.name}#trigger`}><em><FormattedMessage {...messages.httptriggers} /></em></Link>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {
        item.triggersHttp.map((trigger, index) => (
          <li key={`triggerHttp-${index}`}>
            <span className="label label-info">{trigger.method}</span>{ ' ' }
            {trigger.urlpattern}{ ' ' }
          </li>
        ))
      }
      </ul>
    </div>
  );
}

function renderTriggersTimer(item) {
  return (
    <div>
      <Link to={`/functions/edit/${item.name}#trigger`}><em><FormattedMessage {...messages.timertriggers} /></em></Link>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {
          item.triggersTimer.map((timer, index) => (
            <li key={`triggerTimer-${index}`}>
              <span className="label label-info">{timer.cron}</span>{ ' ' }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

function renderTriggersMQ(item) {
  return (
    <div>
      <Link to={`/functions/edit/${item.name}#trigger`}><em><FormattedMessage {...messages.timertriggers} /></em></Link>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {
          item.triggersMQ.map((mqt, index) => (
            <li key={`triggerMQ-${index}`}>
              <span className="label label-info">{mqt.topic}</span>{ ' ' }
              <span className="label label-info">{mqt.respTopic}</span>{ ' ' }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

function renderKubeWatchers(item) {
  return (
    <div>
      <Link to={`/functions/edit/${item.name}#trigger`}><em><FormattedMessage {...messages.kubewatchers} /></em></Link>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {
          item.kubeWatchers.map((watcher, index) => (
            <li key={`kubeWatcher-${index}`}>
              <span className="label label-info">{watcher.namespace}</span>{ ' ' }
              {watcher.objtype}{ ' ' }
              <span className="label label-info">{watcher.labelselector}</span>{ ' ' }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

FunctionListItem.propTypes = {
  item: PropTypes.object,
  onRemove: PropTypes.func,
};

export default FunctionListItem;
