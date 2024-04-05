import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpCircleFill } from 'react-bootstrap-icons';
import filter from 'leo-profanity';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const MessageInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filter.clean(message));
    setMessage('');
  };

  return (
    <Container className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmit}>
        <InputGroup size="lg">
          <Form.Control
            type="text"
            name="body"
            aria-label={t('chat.input.label')}
            placeholder={t('chat.input.placeholder')}
            className=""
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" className="btn-group-vertical" disabled={!message}>
            <ArrowUpCircleFill size={20} color="currentColor" />
            <span className="visually-hidden">{t('buttons.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default MessageInput;
