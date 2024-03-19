const MessageList = ({ messages }) => (
  <div id="messages-box" className="chat-messages overflow-auto px-5">
    {messages.map((message) => (
      <div key={message.id} className="text-break mb-2">
        <b>{message.username}</b>
        <span>: </span>
        {message.body}
      </div>
    ))}
  </div>
);

export default MessageList;
// { id: '5', body: 'text message2', channelId: '1', username: 'admin' },
