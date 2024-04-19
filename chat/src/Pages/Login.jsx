import { Formik, Form } from 'formik';
import {
  FormControl, Button, FormFloating, FormLabel,
} from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserAuth } from '../store/slices/authSlice.js';
import LoginComponent from '../components/LoginComponent.jsx';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string().min(3, 'Минимум 2 буквы').required('Обязательное поле'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  if (authData.token && authData.username) navigate('/');

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log(values);
    console.log(setErrors);
    console.log(setSubmitting);
    const { username, password } = values;
    await axios
      .post('/api/v1/login', { username, password })
      .then((res) => {
        const { data } = res;
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        dispatch(setUserAuth({ token: data.token, username: data.username }));
      });
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
      {({ values, handleChange }) => (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
          <FormFloating className="mb-3">
            <FormControl
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
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
            />
            <FormLabel htmlFor="password">Пароль</FormLabel>
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
