import {
  Nav,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
// import cn from 'classnames'; добавить variant="secondary"

const getChannel = (channel) => (
  <Nav.Item key={channel.id} className="w-100">
    <Button variant="light" className="w-100 rounded-0 text-start">
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  </Nav.Item>
);

const ChannelList = ({ channels }) => (
  <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
    {channels.map(getChannel)}
    <Nav.Item key="dfddf" className="w-100">
      <ButtonGroup className="w-100">
        <Button variant="secondary" className="w-100 rounded-0 text-start">
          <span className="me-1">#</span>
          канал
        </Button>

        <DropdownButton as={ButtonGroup} variant="secondary" title="" id="bg-nested-dropdown">
          <Dropdown.Item eventKey="1">Удалить</Dropdown.Item>
          <Dropdown.Item eventKey="2">Переименовать</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </Nav.Item>
  </Nav>
);

export default ChannelList;
// { id: generalChannelId, name: 'general', removable: false }
