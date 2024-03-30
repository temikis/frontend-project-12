import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Nav from 'react-bootstrap/Nav';

const ChannelList = (props) => {
  const {
    channels,
    onActive,
    activeId,
    showModal,
  } = props;

  const getChannel = (channel) => {
    const isActive = channel.id === activeId;
    const variant = isActive ? 'secondary' : 'light';
    const onClick = () => { onActive(channel); };
    const dropdown = (id) => {
      const idDropdownButton = `bg-nested-dropdown-id${id}`;
      return (
        <DropdownButton as={ButtonGroup} variant={variant} title="" id={idDropdownButton}>
          <Dropdown.Item onClick={() => { showModal('removing', channel); }}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => { showModal('renaming', channel); }}>Переименовать</Dropdown.Item>
        </DropdownButton>
      );
    };

    return (
      <Nav.Item key={channel.id} className="w-100">
        <ButtonGroup className="w-100">
          <Button onClick={onClick} variant={variant} className="w-100 rounded-0 text-start">
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          {channel.removable && dropdown(channel.id)}
        </ButtonGroup>
      </Nav.Item>
    );
  };

  return (
    <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map(getChannel)}
    </Nav>
  );
};

export default ChannelList;
