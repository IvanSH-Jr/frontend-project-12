import { Formik, Form } from 'formik';
import {
  FormControl, Button, FormFloating, FormLabel, FormGroup,
} from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserAuth } from '../store/slices/authSlice.js';
import LoginComponent from '../components/LoginComponent.jsx';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Минимум 4 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string().min(3, 'Минимум 3 буквы').required('Обязательное поле'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  if (authData.token && authData.username) navigate('/');

  const handleSubmit = async ({ username, password }, { setSubmitting, setErrors }) => {
    await axios
      .post('/api/v1/login', { username, password })
      .then((res) => {
        const { data } = res;
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setSubmitting(true);
        dispatch(setUserAuth({ token: data.token, username: data.username }));
      })
      .catch((err) => setErrors(err));
  };
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        errors,
        touched,
      }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
          <FormFloating className="mb-3">
            <FormControl
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
              isInvalid={touched.username && !!errors.username}
              autoFocus
            />
            <FormLabel htmlFor="username">Ваш ник</FormLabel>
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
            <FormLabel htmlFor="password">Пароль</FormLabel>
            <FormGroup className="invalid-tooltip">{errors.password}</FormGroup>
          </FormFloating>
          <Button type="submit" variant="outline-primary" className="w-100">
            Войти
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
