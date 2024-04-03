import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { addChannel } from '../store/channelsApi';
import { setActiveChannel } from '../store/uiSlice';

const AddChannel = (props) => {
  const { onHide, nameChannels } = props;
  const [onSubmitChannel] = addChannel();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmitAddNewChannel = async (newChannel) => {
    const { name } = newChannel;
    const filteredName = filter.clean(name);

    onSubmitChannel({ name: filteredName })
      .unwrap()
      .then((response) => {
        dispatch(setActiveChannel(response));
        toast.success(t('toast.createChannel'));
      })
      .catch((error) => {
        toast.error(t('toast.errorNetwork'));
        console.log(error);
      });

    onHide();
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, t('validate.min3max20'))
      .max(20, t('validate.min3max20'))
      .notOneOf(nameChannels, t('validate.notOneOf'))
      .test('mute-test', t('validate.mute'), (value) => !filter.check(value))
      .required(t('validate.required')),
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
            <Modal.Title>{t('modal.addChannel.title')}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-2" controlId="validationAdd">
                <InputGroup hasValidation>
                  <Form.Label className="visually-hidden">{t('modal.addChannel.name')}</Form.Label>
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
                  {t('buttons.cancel')}
                </Button>
                <Button variant="primary" type="submit">
                  {t('buttons.send')}
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
