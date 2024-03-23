import React, { useState } from 'react';
import { ArrowUpCircleFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const MessageInput = ({ onSubmit, refetch }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage('');
    refetch();
  };

  return (
    <Container className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmit} noValidate className="py-1 border rounded-2">
        <InputGroup hasValidation>
          <Form.Control
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" className="btn-group-vertical" disabled={!message}>
            <ArrowUpCircleFill size={20} color="currentColor" />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default MessageInput;
