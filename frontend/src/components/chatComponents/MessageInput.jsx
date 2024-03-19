import React, { useState } from 'react';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { ArrowUpCircleFill } from 'react-bootstrap-icons';

const MessageInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage('');
  };

  return (
    <Container className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2">
        <InputGroup className="has-validation">
          <Form.Control name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value="" />
          <Button type="submit" className="btn btn-group-vertical" disabled>
            <ArrowUpCircleFill size={20} color="currentColor" />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );

  // return (
  //   <form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
  //     <div className="input-group has-validation">
  //       <input
  //         name="body"
  //         aria-label="Новое сообщение"
  //         placeholder="Введите сообщение..."
  //         className="border-0 p-0 ps-2 form-control"
  //         value={message}
  //         onChange={(e) => setMessage(e.target.value)}
  //       />
  //       <button type="submit" disabled={!message} className="btn btn-group-vertical">
  //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
  //           <path fillRule="evenodd" d=""></path>
  //         </svg>
  //         <span className="visually-hidden">Отправить</span>
  //       </button>
  //     </div>
  //   </form>
  // );
};

export default MessageInput;
