import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Modal,
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { addChannel } from '../store/channelsApi';
import { setActiveChannel } from '../store/uiSlice';

const AddChannel = (props) => {
  const { onHide, nameChannels } = props;
  const [onSubmitChannel] = addChannel();
  const dispatch = useDispatch();

  const onSubmitAddNewChannel = async (newChannel) => {
    const response = await onSubmitChannel(newChannel);
    dispatch(setActiveChannel(response.data));
    onHide();
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(nameChannels, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmitAddNewChannel}
      initialValues={{ name: '' }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Modal show onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить канал</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-2" controlId="validationAdd">
                <InputGroup hasValidation>
                  <Form.Label className="visually-hidden">Имя канала</Form.Label>
                  <Form.Control
                    type="text"
                    ref={inputRef}
                    required
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.name}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="d-flex justify-content-end">
                <Button className="me-2" variant="secondary" onClick={onHide}>
                  Отменить
                </Button>
                <Button variant="primary" type="submit">
                  Отправить
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default AddChannel;
