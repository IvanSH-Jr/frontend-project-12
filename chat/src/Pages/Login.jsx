import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string().min(3, 'Минимум 2 буквы').required('Обязательное поле'),
});

const LoginForm = () => (
  <div>
    <Formik
      initialValues={{
        userName: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={async ({ username, password }) => {
        await axios
          .post('/api/v1/login', { username, password })
          .then((res) => console.log(res.data));
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="userName" />
          {errors.userName && touched.userName ? (
            <div>{errors.userName}</div>
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
          <button type="submit">Submit</button>
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
