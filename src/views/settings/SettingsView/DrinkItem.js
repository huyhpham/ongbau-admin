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
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(({
  root: {}
}));

const DrinkItem = ({ className, ...rest }) => {
    const classes = useStyles(),
    dispatch = useDispatch(),
    success = useSelector(state => state.error.success),
    drinkItemList = useSelector(state => state.app.drinkList),
    [isError, setIsError] = useState(false),
    [errorMessage, setErrorMessage] = useState(''),
    [values, setValues] = useState({
        drinkPrice: '',
        drinkId: '',
    }),
    [open, setOpen] = useState(false),
    [employeeName, setEmployeeName] = useState(null),
    [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const handleOpen = (success) => {
            setOpen(success);
        }

        if(success) {
            handleApiResponse(success);
            handleOpen(success);
        }
    }, [success]);

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
                drinkPrice: '',
                drinkId: '',
            });
            setEmployeeName(null);
        }
    };

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

    const handleGetPosition = (name) => {
        drinkItemList.forEach((item) => {
            if(name === item.name) {
                setValues({
                    ...values,
                    drinkPrice: item.price,
                    drinkId: item._id
                })
            }
        });
    };

    const handleUpdate = () => {
        const drinkItem = {
            itemId: values.drinkId,
            name: employeeName,
            price: values.drinkPrice
        }
        // console.log(drinkItem);
        dispatch(appActions.updateDrink(drinkItem));
    }

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
          subheader="Cập nhập giá theo từng món nước"
          title="Món nước"
        />
        <Divider />
        <CardContent>
            <Autocomplete
                id="combo-box-demo"
                value={employeeName}
                options={drinkItemList.map((option) => option.name)}
                onChange={(event, value) => {setEmployeeName(value); handleGetPosition(value);}}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Món nước" variant="outlined" />}
            />
            <TextField
                fullWidth
                label="Giá tiền"
                margin="normal"
                name="drinkPrice"
                onChange={handleChange}
                value={values.drinkPrice}
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
            onClick={() => {handleUpdate();}}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

DrinkItem.propTypes = {
  className: PropTypes.string
};

export default DrinkItem;
