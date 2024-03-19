import { Container, Row, Col } from 'react-bootstrap';
import HeaderMessage from './chatComponents/HeaderMessage';
import ChannelList from './chatComponents/ChannelList';
import HeaderChannel from './chatComponents/HeaderChannel';
import MessageList from './chatComponents/MessageList';
import MessageInput from './chatComponents/MessageInput';
import { getChannels } from '../store/channelsApi';
import { getMessages } from '../store/messagesApi';

const MainPage = () => {
  console.log(getChannels());
  console.log(getMessages());
  // { channelName, channels, messages, onSubmitMessage }
  const channelName = 'Channel';
  const messages = [
    // eslint-disable-next-line object-curly-newline
    { id: '4', body: 'text message1', channelId: '1', username: 'admin' },
    // eslint-disable-next-line object-curly-newline
    { id: '5', body: 'text message2', channelId: '1', username: 'admin' },
  ];
  const {
    data: channelsData,
    isLoading: isLoadingChannels,
    refetch: onSubmitMessage,
  } = getChannels();
  const channels = isLoadingChannels ? [] : channelsData;
  // const { data: messages } = getMessages();

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end px-0 bg-light flex-column d-flex">
          <HeaderChannel />
          <ChannelList channels={channels} />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <HeaderMessage channelName={channelName} />
            <MessageList messages={messages} />
            <MessageInput onSubmit={onSubmitMessage} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
