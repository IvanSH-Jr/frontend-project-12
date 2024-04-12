import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string().min(3, 'Минимум 2 буквы').required('Обязательное поле'),
});

const LoginForm = () => (
  <div>
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
  <div>
    <h1 className="text-muted">Войти</h1>
    <LoginForm />
  </div>
);

export default Login;
