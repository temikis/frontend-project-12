import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { PlusSquare } from 'react-bootstrap-icons';

const HeaderChannel = ({ showModal }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('chat.headerChannel.title')}</b>
      <Button onClick={() => { showModal('adding'); }} type="button" variant="group-vertical" className="p-0">
        <PlusSquare width="20" height="20" />
        <span className="visually-hidden">+</span>
      </Button>
    </div>
  );
};

export default HeaderChannel;
