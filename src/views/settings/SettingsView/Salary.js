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

const Salary = ({ className, ...rest }) => {
    const classes = useStyles(),
    dispatch = useDispatch(),
    success = useSelector(state => state.error.success),
    [isError, setIsError] = useState(false),
    [errorMessage, setErrorMessage] = useState(''),
    [values, setValues] = useState({
        salaryRangeNormal: 0,
        salaryRangeHoliday: 0,
        salaryRangeWeekend: 0,
    }),
    [open, setOpen] = useState(false),
    [employeeName, setEmployeeName] = useState(null),
    [inputValue, setInputValue] = useState(''),
    [positionKey, setPositionKey] = useState('');

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
            salaryRangeNormal: 0,
            salaryRangeWeekend: 0,
            })
        }
        setEmployeeName(null);
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

    useEffect(() => {
        const handleOpen = (success) => {
            setOpen(success);
        }

        if(success) {
            handleApiResponse(success);
            handleOpen(success);
        }
    }, [success]);

    const handleGetPosition = (name) => {
        positionList.forEach((item) => {
            if(name === item.name) {
                setPositionKey(item.specificKey);
            }
        });
    };

    const handleUpdate = () => {
        const salarySetting = {
            settingName: "Salary",
            settingCategory: "salary",
            settingSpecificName: "",
            settingPosition: employeeName,
            settingPositionKey: positionKey,
            settingValue: {
                salaryRangeNormalDay: values.salaryRangeNormal,
                salaryRangeWeekendDay: values.salaryRangeWeekend
            }, 
        }

        dispatch(appActions.updateSalary(salarySetting));
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
          subheader="Update Salary"
          title="Salary"
        />
        <Divider />
        <CardContent>
            <Autocomplete
                id="combo-box-demo"
                value={employeeName}
                options={positionList.map((option) => option.name)}
                onChange={(event, value) => {setEmployeeName(value); handleGetPosition(value);}}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Chức vụ" variant="outlined" />}
            />
            <TextField
                fullWidth
                label="Mức lương ngày thường"
                margin="normal"
                name="salaryRangeNormal"
                onChange={handleChange}
                value={values.salaryRangeNormal}
                variant="outlined"
                error={isError}
                helperText={errorMessage}
            />
            <TextField
                fullWidth
                label="Mức lương cuối tuần"
                margin="normal"
                name="salaryRangeWeekend"
                onChange={handleChange}
                value={values.salaryRangeWeekend}
                variant="outlined"
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

const positionList = [
    { name: "Pha chế", specificKey: "pc" },
    { name: "Phục vụ", specificKey: "pv" },
    { name: "Thu ngân", specificKey: "tn" },
];

Salary.propTypes = {
  className: PropTypes.string
};

export default Salary;
