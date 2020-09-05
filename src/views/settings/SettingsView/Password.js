import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import * as appActions from '../../../store/actions/app';

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles(),
    dispatch = useDispatch(),
    userData = useSelector(state => state.app.user),
    success = useSelector(state => state.error.success),
    [isError, setIsError] = useState(false),
    [errorMessage, setErrorMessage] = useState(''),
    [values, setValues] = useState({
      userName: userData.userName,
      currPassword: '',
      newPassword: '',
      confirm: ''
    }),
    [open, setOpen] = useState(false);
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleApiResponse = (success) => {
    if(success) {
      setValues({
        ...values,
        currPassword: '',
        newPassword: '',
        confirm: ''
      })
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(appActions.getSuccess(false));
    setOpen(false);
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleUpdatePassword = () => {
    if (values.currPassword === values.newPassword) {
      setIsError(true);
      setErrorMessage('The new password is match with current password.');
    } else if (values.newPassword !== values.confirm) {
      setIsError(true);
      setErrorMessage('The password confirmation does not match.');
    } else {
      setIsError(false);
      setErrorMessage('');
    }
    
    dispatch(appActions.updateUserPassword(values));
  };

  useEffect(() => {
    const handleOpen = (success) => {
      setOpen(success);
    }

    if(success) {
      handleApiResponse(success);
      handleOpen(success);
    }
  }, [success]);

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success">
          Update Successfully!
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
        <TextField
            fullWidth
            label="Current Password"
            margin="normal"
            name="currPassword"
            onChange={handleChange}
            type="password"
            value={values.currPassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New Password"
            margin="normal"
            name="newPassword"
            onChange={handleChange}
            type="password"
            value={values.newPassword}
            variant="outlined"
            error={isError}
            helperText={errorMessage}
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
            error={isError}
            helperText={errorMessage}
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleUpdatePassword()}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
