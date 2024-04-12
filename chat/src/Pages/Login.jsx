import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import loginPicture from '../assets/login.jpg';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string().min(3, 'Минимум 2 буквы').required('Обязательное поле'),
});

const LoginForm = () => (
  <div>
    <h1 className="text-muted">Войти</h1>
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={async ({ username, password }) => {
        await axios
          .post('/api/v1/login', { username, password })
          .then((res) => {
            const { data } = res;
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
          });
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="username" />
          {errors.username && touched.username ? (
            <div>{errors.username}</div>
          ) : null}
          <Field
            id="password"
            name="password"
            placeholder="Пароль"
            type="password"
          />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <button type="submit" className="">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

const Login = () => (
  <div className="col-12 col-md-8 col-xxl-6">
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={loginPicture} width={200} height={200} className="rounded-circle" alt="Авторизация. Вход." />
            </div>
            <LoginForm />
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              <a href="/signup">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
