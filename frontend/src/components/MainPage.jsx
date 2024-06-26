import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { getMessages } from '../store/messagesApi';
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
  const activeChannel = useSelector(getCurrentActiveChannel);
  const channelId = activeChannel.id;

  const { data: channels, isLoading: isLoadingChannels } = getChannels();
  const { data: messages, isLoadingMessages } = getMessages(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      data: data?.filter((message) => message.channelId === channelId),
      isLoadingMessages: isLoading,
    }),
  });

  const hideModal = () => dispatch(setModalChannel({ type: null, channel: null }));
  const showModal = (type, channel = null) => dispatch(setModalChannel({ type, channel }));

  if (isLoadingChannels || isLoadingMessages) {
    return <Spinner />;
  }

  const handlerMakeActiveChannel = (channel) => {
    dispatch(setActiveChannel(channel));
  };

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md={2} className="border-end px-0 bg-light flex-column d-flex h-100">
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
              <MessageInput activeChannel={activeChannel} />
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
