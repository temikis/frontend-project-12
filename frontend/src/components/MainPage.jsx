import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
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
import {
  setModalChannel,
  getCurrentModalChannel,
  setActiveChannel,
  getCurrentActiveChannel,
} from '../store/uiSlice';
import getModal from '../modals/index';

const renderModal = (props) => {
  const {
    modalChannel,
    hideModal,
    channels,
    activeChannel,
  } = props;

  if (!modalChannel.type) {
    return null;
  }

  const nameChannels = [...channels].map((channel) => channel.name);

  const Component = getModal(modalChannel.type);
  return (
    <Component
      modalChannel={modalChannel}
      onHide={hideModal}
      nameChannels={nameChannels}
      activeChannel={activeChannel}
    />
  );
};

const MainPage = () => {
  const dispatch = useDispatch();
  const modalChannel = useSelector(getCurrentModalChannel);
  const hideModal = () => dispatch(setModalChannel({ type: null, channel: null }));
  const showModal = (type, channel = null) => dispatch(setModalChannel({ type, channel }));

  const activeChannel = useSelector(getCurrentActiveChannel);
  const username = useSelector(getCurrentUser);
  const {
    data: channels,
    isLoading: isLoadingChannels,
    error: errorChannels,
  } = getChannels();
  const {
    data: allMessages,
    isLoading: isLoadingMessages,
    error: errorMessages,
  } = getMessages();
  const [onSubmitMessage] = addMessage();

  if (isLoadingChannels || isLoadingMessages) {
    return <Spinner />;
  }

  if (errorMessages || errorChannels) {
    toast.warn('Проблема с получением данных');
  }

  const messages = errorChannels
    ? [] : allMessages.filter((message) => message.channelId === activeChannel.id);

  const handlerSubmitMessage = (message) => {
    onSubmitMessage({ body: message, channelId: activeChannel.id, username });
  };

  const handlerMakeActiveChannel = (channel) => {
    dispatch(setActiveChannel(channel));
  };

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md={2} className="border-end px-0 bg-light flex-column d-flex">
            <HeaderChannel showModal={showModal} />
            <ChannelList
              channels={channels}
              onActive={handlerMakeActiveChannel}
              activeId={activeChannel?.id}
              showModal={showModal}
            />
          </Col>
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <HeaderMessage channelName={activeChannel?.name} countMessage={messages.length} />
              <MessageList messages={messages} />
              <MessageInput onSubmit={handlerSubmitMessage} />
            </div>
          </Col>
        </Row>
      </Container>
      {renderModal({
        modalChannel,
        hideModal,
        channels,
        activeChannel,
      })}
    </>
  );
};

export default MainPage;
