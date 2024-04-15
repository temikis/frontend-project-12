import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ArrowUpCircleFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useFilter } from '../../contexts/filterContex';
import { addMessage } from '../../store/messagesApi';
import { getCurrentUser } from '../../store/authSlice';

const MessageInput = ({ activeChannel }) => {
  const [message, setMessage] = useState('');
  const { t } = useTranslation();
  const filter = useFilter();
  const inputRef = useRef(null);
  const [onSubmitMessage, { isLoading }] = addMessage();
  const username = useSelector(getCurrentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    const modaratedMessage = filter.clean(message);
    onSubmitMessage({ body: modaratedMessage, channelId: activeChannel?.id, username });
    setMessage('');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannel]);

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
            ref={inputRef}
          />
          <Button type="submit" className="btn-group-vertical" disabled={!message || isLoading}>
            <ArrowUpCircleFill size={20} color="currentColor" />
            <span className="visually-hidden">{t('buttons.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default MessageInput;
