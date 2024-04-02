import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { removeChannel } from '../store/channelsApi';

const RemoveChannel = (props) => {
  const { onHide, modalChannel } = props;
  const [onSubmitChannel] = removeChannel();
  const { id } = modalChannel.channel;
  const { t } = useTranslation();

  const onDelete = async () => {
    await onSubmitChannel(id);
    onHide();
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.removeChannel.p')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={onHide}>
            {t('buttons.cancel')}
          </Button>
          <Button variant="danger" onClick={onDelete}>
            {t('buttons.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
