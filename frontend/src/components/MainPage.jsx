import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import HeaderMessage from './chatComponents/HeaderMessage';
import ChannelList from './chatComponents/ChannelList';
import HeaderChannel from './chatComponents/HeaderChannel';
import MessageList from './chatComponents/MessageList';
import MessageInput from './chatComponents/MessageInput';
import Spinner from './Spinner';
import { getChannels } from '../store/channelsApi';
import { getMessages, addMessage } from '../store/messagesApi';
import { getCurrentUser } from '../store/authSlice';

const MainPage = () => {
  const [activeChannel, setActiveChannel] = useState({ id: null, name: null });
  const username = useSelector(getCurrentUser);
  const {
    data: channels,
    isLoading: isLoadingChannels,
    // refetch: refetchChannels,
  } = getChannels();
  const {
    data: allMessages,
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = getMessages();
  const [onSubmitMessage] = addMessage();

  if (isLoadingChannels || isLoadingMessages) {
    return <Spinner />;
  }

  const messages = allMessages.filter((message) => message.channelId === activeChannel.id);

  const handlerSubmitMessage = (message) => {
    onSubmitMessage({ body: message, channelId: activeChannel.id, username });
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end px-0 bg-light flex-column d-flex">
          <HeaderChannel />
          <ChannelList
            channels={channels}
            onActive={setActiveChannel}
            activeId={activeChannel.id}
          />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <HeaderMessage channelName={activeChannel.name} countMessage={messages.length} />
            <MessageList messages={messages} />
            <MessageInput onSubmit={handlerSubmitMessage} refetch={refetchMessages} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
