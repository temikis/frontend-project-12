import React from 'react';
import { Image } from 'react-bootstrap';
import logo404 from './logo404.jpg';

const NotFoundPage = () => (
  <div className="text-center">
    <Image
      alt="Страница не найдена"
      className="img-fluid h-25"
      style={{ width: '30%', height: 'auto' }}
      src={logo404}
    />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      <a href="/">на главную страницу</a>
    </p>
  </div>
);

export default NotFoundPage;
