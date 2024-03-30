import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { removeChannel } from '../store/channelsApi';

const RemoveChannel = (props) => {
  const { onHide, modalChannel } = props;
  const [onSubmitChannel] = removeChannel();
  const { id } = modalChannel.channel;

  const onDelete = async () => {
    await onSubmitChannel(id);
    onHide();
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={onHide}>
            Отменить
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
