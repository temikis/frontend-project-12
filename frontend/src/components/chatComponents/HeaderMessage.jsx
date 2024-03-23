import React from 'react';

const HeaderMessage = ({ channelName = '', countMessage = 0 }) => (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    <p className="m-0"><b>{`# ${channelName}`}</b></p>
    <span className="text-muted">
      {countMessage}
      <span> сообщений</span>
    </span>
  </div>
);

export default HeaderMessage;
