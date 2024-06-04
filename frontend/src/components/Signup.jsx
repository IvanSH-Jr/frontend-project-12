import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup, FormControl, Button, FormFloating, FormLabel,
} from 'react-bootstrap';
import SignupComponent from './SignupComponent';
import registr from '../assets/registr.png';
import { useSignupMutation } from '../api/userApi';
import { setUserAuth } from '../slices/authSlice';
import routes from '../routes/routes';

const Signup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('signup.errors.username'))
      .max(20, t('signup.errors.username'))
      .required(t('signup.errors.required')),
    password: Yup.string().min(6, t('signup.errors.shortPassword')).required(t('signup.errors.shortPassword')),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], t('signup.errors.passwordMatch')).required(t('signup.errors.required')),
  });
  const handleSubmit = async ({ username, password }, { setErrors }) => {
    await signup({ username, password })
      .unwrap()
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        dispatch(setUserAuth({ token: data.token, username: data.username }));
        navigate(routes.chat());
      })
      .catch((err) => {
        const { status } = err;
        switch (status) {
          case 409: {
            setErrors({ username: ' ', password: ' ', confirmPassword: t('signup.errors.userExists') });
            break;
          }
          case 'FETCH_ERROR': {
            setErrors({ username: ' ', password: ' ', confirmPassword: t('signup.errors.network') });
            break;
          }
          default: {
            setErrors({ username: ' ', password: ' ', confirmPassword: t('signup.errors.defaultErr') });
          }
        }
      });
  };
  return (
    <SignupComponent img={registr}>
      <Formik
        initialValues={{ username: '', password: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={signupSchema}
        validateOnChange={false}
        validateOnBlur
      >
        {({
          errors, values, handleChange, handleBlur, isSubmitting,
        }) => (
          <Form className="w-50">
            <h1 className="text-center mb-4">{t('signup.form.header')}</h1>
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
              <FormLabel htmlFor="username">{t('signup.form.username')}</FormLabel>
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
              <FormLabel htmlFor="password">{t('signup.form.password')}</FormLabel>
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
              <FormLabel htmlFor="confirmPassword">{t('signup.form.confirmPassword')}</FormLabel>
              <FormGroup className="invalid-tooltip">{errors.confirmPassword}</FormGroup>
            </FormFloating>
            <Button type="submit" variant="outline-primary" className="w-100" disabled={isSubmitting}>
              {t('signup.form.regBtn')}
            </Button>
          </Form>
        )}
      </Formik>
    </SignupComponent>
  );
};

export default Signup;
