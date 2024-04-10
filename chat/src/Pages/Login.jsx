import { Formik, Field, Form } from 'formik';

const LoginForm = () => (
  <Formik
    initialValues={{
      userName: '',
      password: '',
    }}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    <Form>
      <Field id="userName" name="userName" placeholder="Ваш ник" />
      <Field
        id="password"
        name="password"
        placeholder="Пароль"
        type="password"
      />
      <button type="submit">Войти</button>
    </Form>
  </Formik>
);

const Login = () => (
  <div>
    <h1 className="text-muted">Войти</h1>
    <LoginForm />
  </div>
);

export default Login;
