import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import logo404 from '../../assets/logo404.jpg';
import routes from '../../utils/routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image
        alt={t('notFoundPage.logo')}
        className="img-fluid h-25 mt-4"
        src={logo404}
      />
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.sentence')}
        <Link to={routes.root()}>{t('notFoundPage.link')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
