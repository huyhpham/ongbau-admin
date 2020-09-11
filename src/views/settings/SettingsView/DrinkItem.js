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
  Snackbar,
  Switch 
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
    [newValues, setNewValues] = useState({
      drinkPrice: '',
      drinkName: '',
    }),
    [state, setState] = React.useState({
      isAddNew: false,
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

    const handleNewChange = (event) => {
      setNewValues({
          ...newValues,
          [event.target.name]: event.target.value
      });
  };

    const handleSwitch = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
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
        if(state.isAddNew === true) {
          const newDrinkItem = {
            name: newValues.drinkName,
            price: newValues.drinkPrice
          }

          dispatch(appActions.addDrinkItem(newDrinkItem));
        } else {
          const drinkItem = {
            itemId: values.drinkId,
            name: employeeName,
            price: values.drinkPrice
          }

          dispatch(appActions.updateDrink(drinkItem));
        }
        
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
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <CardHeader
            subheader="Cập nhập giá theo từng món nước"
            title="Món nước"
          />
          <Switch
            checked={state.isAddNew}
            onChange={handleSwitch}
            color="primary"
            name="isAddNew"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Box>
        
        <Divider />
        {state.isAddNew 
        ? <CardContent>
            <TextField
                fullWidth
                label="Món nước"
                margin="normal"
                name="drinkName"
                onChange={handleNewChange}
                value={newValues.drinkName}
                variant="outlined"
                error={isError}
                helperText={errorMessage}
            />
            <TextField
                fullWidth
                label="Giá tiền"
                margin="normal"
                name="drinkPrice"
                onChange={handleNewChange}
                value={newValues.drinkPrice}
                variant="outlined"
                error={isError}
                helperText={errorMessage}
            />
        </CardContent>
        : <CardContent>
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
        }
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
            {state.isAddNew ? "Thêm" : "Cập nhập"}
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
