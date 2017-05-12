/**
*
* FunctionLogItem
*
*/

import React, { PropTypes } from 'react';

function FunctionLogItem({ log }) {
  if (log === null || log.log.length === 0 || !log.log.trim()) {
    return <div />;
  }
  const type = log.stream === 'stdout' ? 'alert-success' : 'alert-warning';
  return (
    <div>
      <span className="badge ">{log.time.toISOString()}</span>
      <span className="badge alert-info">{`Version-${log.funcuid.substring(0, 7)}`}</span>
      <span className="badge alert-info">{`Container-${log.container.substring(0, 7)}`}</span>
      <span className={`badge ${type}`}>{log.stream}</span>
      <br />
      <span>{log.log}</span>
    </div>
  );
}

FunctionLogItem.propTypes = {
  log: PropTypes.object,
};

export default FunctionLogItem;
