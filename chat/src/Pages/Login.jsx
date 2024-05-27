import { Formik, Form } from 'formik';
import {
  FormControl, Button, FormFloating, FormLabel, FormGroup,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserAuth } from '../store/slices/authSlice.js';
import { useLoginMutation } from '../api/userApi.js';
import LoginComponent from '../components/LoginComponent.jsx';
import routes from '../routes/routes.js';

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginReq] = useLoginMutation();
  const { t } = useTranslation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, t('login.errors.usernameShort'))
      .max(20, t('login.errors.usernameLarge'))
      .required(t('login.errors.usernameRequired')),
    password: Yup.string().min(3, t('login.errors.passwordShort')).required(t('login.errors.passwordRequired')),
  });
  const handleSubmit = async ({ username, password }) => {
    const { data } = await loginReq({ username, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    dispatch(setUserAuth({ token: data.token, username: data.username }));
    navigate(routes.chat());
  };
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        errors,
        touched,
      }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('login.form.header')}</h1>
          <FormFloating className="mb-3">
            <FormControl
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
              isInvalid={touched.username && !!errors.username}
              autoFocus
            />
            <FormLabel htmlFor="username">{t('login.form.username')}</FormLabel>
          </FormFloating>
          <FormFloating className="mb-3">
            <FormControl
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={touched.password && !!errors.password}
            />
            <FormLabel htmlFor="password">{t('login.form.password')}</FormLabel>
            <FormGroup className="invalid-tooltip">{errors.password}</FormGroup>
          </FormFloating>
          <Button type="submit" variant="outline-primary" className="w-100">
            {t('login.form.loginBtn')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => (
  <LoginComponent>
    <LoginForm />
  </LoginComponent>
);

export default Login;
