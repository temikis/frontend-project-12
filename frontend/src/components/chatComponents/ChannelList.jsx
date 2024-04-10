import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';

const ChannelList = (props) => {
  const {
    channels,
    onActive,
    activeId,
    showModal,
  } = props;
  const { t } = useTranslation();

  const getChannel = (channel) => {
    const isActive = channel.id === activeId;
    const variant = isActive ? 'secondary' : 'light';
    const onClick = () => { onActive(channel); };
    const dropdown = () => (
      <>
        <Dropdown.Toggle split variant={variant} id="dropdown-split-basic">
          <span className="visually-hidden">{t('buttons.management')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => { showModal('removing', channel); }}>
            {t('chat.channelList.delete')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => { showModal('renaming', channel); }}>
            {t('chat.channelList.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </>
    );

    return (
      <Nav.Item key={channel.id} className="w-100">
        <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
          <Button onClick={onClick} variant={variant} className="w-100 rounded-0 text-start text-truncate">
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          {channel.removable && dropdown(channel.id)}
        </Dropdown>
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
