import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import loginPicture from '../assets/login.jpg';

const LoginComponent = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginPicture} className="rounded-circle img-fluid" alt={t('login.form.header')} />
              </div>
              {children}
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.form.footer')}</span>
                {' '}
                <Link to="/signup">{t('login.form.footerRegLink')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
