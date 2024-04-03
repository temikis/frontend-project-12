import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Formik } from 'formik';
import * as yup from 'yup';
import routes from '../../utils/routes.js';
import { setCredentials } from '../../store/authSlice';
import logosingup from './logosingup.jpg';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { t } = useTranslation();

  const onSubmitSignUp = async ({ username, password }, props) => {
    const { setErrors, setSubmitting } = props;

    try {
      const res = await axios.post(routes.createNewUser(), { username, password });
      const userData = res.data;
      dispatch(setCredentials(userData));
      navigate('/');
    } catch (err) {
      setSubmitting(false);
      if (err.isAxiosError && err.response.status === 409) {
        setErrors({ username: t('errors.userExists') });
        inputRef.current.select();
        return;
      }
      toast.error(t('toast.errorNetwork'));
      throw err;
    }
  };

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('validate.min3max20'))
      .max(20, t('validate.min3max20'))
      .required(t('validate.required')),
    password: yup
      .string()
      .min(6, t('validate.min6'))
      .required(t('validate.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validate.oneOf'))
      .required(t('validate.required')),
  });

  const getFormikForm = () => (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmitSignUp}
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validateOnChange={false}
      validateOnBlur
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <Form className="w-50" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">{t('signUp.title')}</h1>

          <FloatingLabel className="mb-3" controlId="username" label={t('signUp.form.username')}>
            <Form.Control
              type="text"
              placeholder="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.username && !!errors.username}
              ref={inputRef}
              required
              autoFocus
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {touched.username && errors.username}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel className="mb-3" controlId="password" label={t('signUp.form.password')}>
            <Form.Control
              type="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && !!errors.password}
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {touched.password && errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel className="mb-3" controlId="confirmPassword" label={t('signUp.form.confirmPassword')}>
            <Form.Control
              type="password"
              placeholder="confirm password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {touched.confirmPassword && errors.confirmPassword}
            </Form.Control.Feedback>
          </FloatingLabel>

          <Button variant="outline-primary" type="submit" disabled={isSubmitting} className="w-100">{t('buttons.signUp')}</Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div><img src={logosingup} className="rounded-circle" alt={t('signUp.logo')} /></div>
              {getFormikForm()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
