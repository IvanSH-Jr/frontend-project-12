// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup, FormControl, Button, FormFloating, FormLabel,
} from 'react-bootstrap';
import SignupComponent from '../components/SignupComponent';
import registrationPicture from '../assets/registr';

const Signup = () => {
  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'less than 3')
      .max(20, 'large')
      .required('required'),
    password: Yup.string().min(6, 'tooShort').required('required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], '').required('required'),
  });
  return (
    <SignupComponent img={registrationPicture}>
      <Formik
        initialValues={{ username: '', password: '', confirmPassword: '' }}
        onSubmit={(e) => console.log(e)}
        validationSchema={signupSchema}
        validateOnChange={false}
        validateOnBlur
      >
        {({
          errors, values, handleChange, handleBlur, isSubmitting,
        }) => (
          <Form className="w-50">
            <h1 className="text-center mb-4">Регистрация</h1>
            <FormFloating className="mb-3">
              <FormControl
                name="username"
                id="username"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={!!errors.username}
                autoFocus
              />
              <FormLabel htmlFor="username">Имя пользователя</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.username}</FormGroup>
            </FormFloating>

            <FormFloating className="mb-3">
              <FormControl
                type="password"
                name="password"
                id="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.password}</FormGroup>
            </FormFloating>

            <FormFloating className=" mb-4">
              <FormControl
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
              />
              <FormLabel htmlFor="confirmPassword">Еще раз пароль</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.confirmPassword}</FormGroup>
            </FormFloating>
            <Button type="submit" variant="outline-primary" className="w-100" disabled={isSubmitting}>
              Зарегаться
            </Button>
          </Form>
        )}
      </Formik>
    </SignupComponent>
  );
};

export default Signup;
