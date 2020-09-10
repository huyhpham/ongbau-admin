import React, { useState, useEffect } from 'react';
import { useHistory  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../../store/actions/app';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles(),
    history = useHistory(),
    dispatch = useDispatch(),
    [isError, setIsError] = useState(),
    [errorMessage, setErrorMessage] = useState(''),
    error = useSelector(state => state.error.error);

  const handleError = value => {
    setIsError(value);
    setErrorMessage('Invalid Account.')
  }

  useEffect(() => {
    if(error) {
      handleError(error);
    }
  }, [error]);

  const handleLogin = (values) => {
    if(!isError) {
      setIsError(false);
      setErrorMessage('');
    }
    dispatch(appActions.login(values, history));
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              //email: '',
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              //email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().min(6).required('Password is required')
            })}
            onSubmit={(values, actions) => {
              handleLogin(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Đăng nhập
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Đăng nhập vào trang admin Ông Bầu
                  </Typography>
                </Box>
                <TextField
                  //error={isError ? isError : Boolean(touched.email && errors.email)}
                  fullWidth
                  //helperText={isError ? errorMessage : (touched.email && errors.email)}
                  error={isError}
                  helperText={errorMessage}
                  label="User Name"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="username"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={isError ? isError : Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={isError ? errorMessage : (touched.password && errors.password)}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
