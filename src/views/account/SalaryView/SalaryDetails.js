import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../../../store/actions/app';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Snackbar,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

const useStyles = makeStyles(() => ({
  root: {}
}));

const SalaryDetails = ({ className, ...rest }) => {
  const classes = useStyles(),
    employeeList = useSelector(state => state.app.employeeList),
    employeeSalaryList = useSelector(state => state.app.employeeSalaryList),
    salaryList = useSelector(state => state.app.salaryList),
    dispatch = useDispatch();
  const [values, setValues] = useState({
        positionName: '',
        positionKey: '',
        normalDay: 0,
        weekendDay: 0,
        holiday: 0,
        otherDay: 0,
        isOverTime: false,
        over8HoursDay: 0,
        date: '',
        salaryRangeNormal: 0,
        salaryRangeHoliday: 0,
        salaryRangeWeekend: 0,
        salaryRangeOtherDay: 0,
        isOtherDay: false,
    }),
    [open, setOpen] = useState(false),
    [employeeName, setEmployeeName] = useState(null),
    [inputValue, setInputValue] = useState(''),
    [newEmployeeList, setNewEmployeeList] = useState([]),
    [total, setTotal] = useState(0);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChecked = () => {
    setValues({
        ...values,
        over8HoursDay: 0,
        isOverTime: !values.isOverTime
      });
  }

  const handleCheckedOtherDay = () => {
    setValues({
        ...values,
        isOtherDay: !values.isOtherDay
    });
  }

  const handleApiResponse = () => {
      setValues({
        ...values,
        positionName: '',
        positionKey: '',
        normalDay: 0,
        weekendDay: 0,
        holiday: 0,
        otherDay: 0,
        isOverTime: false,
        over8HoursDay: 0,
        salaryRangeNormal: 0,
        salaryRangeHoliday: 0,
        salaryRangeWeekend: 0,
        salaryRangeOtherDay: 0,
        isOtherDay: false,
      });
      setEmployeeName(null);
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

  const handleSubmit = () => {
    let totalMoney = 0;
    if (values.isOverTime) {
        if(values.isOtherDay) {
            totalMoney = (values.salaryRangeNormal * values.normalDay + values.salaryRangeWeekend * values.weekendDay 
                + values.salaryRangeHoliday * values.holiday + 20 * values.over8HoursDay + values.otherDay * values.salaryRangeOtherDay);
        } else {
            totalMoney = (values.salaryRangeNormal * values.normalDay + values.salaryRangeWeekend * values.weekendDay 
                + values.salaryRangeHoliday * values.holiday + 20 * values.over8HoursDay);
        }
        
    } else {
        if(values.isOtherDay) {
            totalMoney = (values.salaryRangeNormal * values.normalDay + values.salaryRangeWeekend * values.weekendDay 
                + values.salaryRangeHoliday * values.holiday + values.otherDay * values.salaryRangeOtherDay);
        } else {
            totalMoney = (values.salaryRangeNormal * values.normalDay + values.salaryRangeWeekend * values.weekendDay 
                + values.salaryRangeHoliday * values.holiday);
        }
    }

    const employee = {
        employeeName: employeeName,
        positionName: values.positionName,
        positionKey: values.positionKey,
        normalDay: values.normalDay,
        weekendDay: values.weekendDay,
        holiday: values.holiday,
        otherDay: values.otherDay,
        isOverTime: values.isOverTime,
        over8HoursDay: values.over8HoursDay,
        date: values.date,
        totalMoney: totalMoney + '000'
    }

    dispatch(appActions.getEmployeeSalaryList(employee));
  };

  const handleGetPosition = (name) => {
    newEmployeeList.forEach((item1) => {
      salaryList.forEach((item2) => {
        if(name === item1.name) {
          if (item1.value === item2.settingPositionKey) {
              setValues({
                  ...values,
                  positionName: item1.position,
                  positionKey: item1.value,
                  salaryRangeNormal: item2.settingValue.salaryRangeNormalDay,
                  salaryRangeWeekend: item2.settingValue.salaryRangeWeekendDay
              });
          } else if (item1.value === item2.settingPositionKey) {
              setValues({
                  ...values,
                  positionName: item1.position,
                  positionKey: item1.value,
                  salaryRangeNormal: item2.settingValue.salaryRangeNormalDay,
                  salaryRangeWeekend: item2.settingValue.salaryRangeWeekendDay
              });
          } else if (item1.value === item2.settingPositionKey) {
              setValues({
                  ...values,
                  positionName: item1.position,
                  positionKey: item1.value,
                  salaryRangeNormal: item2.settingValue.salaryRangeNormalDay,
                  salaryRangeWeekend: item2.settingValue.salaryRangeWeekendDay
              });
          }
        }
      })
    })
  };

  useEffect(() => {
    setNewEmployeeList(employeeList);
    const today = moment().format('YYYY-MM-DD');
    setValues({
      ...values,
      date: today
    })
  }, []);

  useEffect(() => {
    if (employeeSalaryList.length !== 0) {
      // let newArray = [];
      // employeeSalaryList.forEach((item1) => {
      //   newEmployeeList.forEach((item2) => {
      //     if(item1.employeeName === item2.name) {
      //       newArray = newEmployeeList.filter(function( obj ) {
      //         return obj.name !== item1.employeeName;
      //       });
      //       setNewEmployeeList(newArray);
      //     }
      //   });
      // });

      let total = 0;
      employeeSalaryList.forEach((item) => {
        total += Number(item.totalMoney);
      });
      setTotal(total);
    } else {
      setTotal(0);
    }
  }, [employeeSalaryList]);

  

  return (
    <form
      autoComplete="off"
      noValidate
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
          //subheader="Nhớ kiểm tra nguyên vật liệu sau mỗi ngày bán hàng."
          title="Bảng tính lương"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Autocomplete
                id="combo-box-demo"
                value={employeeName}
                options={newEmployeeList.map((option) => option.name)}
                onChange={(event, value) => {setEmployeeName(value); handleGetPosition(value);}}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Tên nhân viên" variant="outlined" />}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                //helperText="Please specify the first name"
                label="Chức vụ"
                name="positionName"
                onChange={handleChange}
                required
                value={values.positionName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Ngày tính lương"
                name="date"
                id="date"
                type="date"
                onChange={handleChange}
                required
                value={values.date}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    Số giờ làm việc: 
                </Typography>
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                    fullWidth
                    label="Số giờ làm trong tuần"
                    name="normalDay"
                    onChange={handleChange}
                    required
                    value={values.normalDay}
                    variant="outlined"
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                    fullWidth
                    label="Mức lương bình thường"
                    name="salaryRangeNormal"
                    onChange={handleChange}
                    required
                    value={values.salaryRangeNormal}
                    variant="outlined"
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                    fullWidth
                    label="Số giờ làm cuối tuần"
                    name="weekendDay"
                    onChange={handleChange}
                    value={values.weekendDay}
                    variant="outlined"
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                    fullWidth
                    label="Mức lương cuối tuần"
                    name="salaryRangeWeekend"
                    onChange={handleChange}
                    required
                    value={values.salaryRangeWeekend}
                    variant="outlined"
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                    fullWidth
                    label="Số giờ làm ngày lễ"
                    name="holiday"
                    onChange={handleChange}
                    value={values.holiday}
                    variant="outlined"
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                    fullWidth
                    label="Mức lương ngày lễ"
                    name="salaryRangeHoliday"
                    onChange={handleChange}
                    value={values.salaryRangeHoliday}
                    variant="outlined"
                />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={values.isOtherDay}
                        onChange={handleCheckedOtherDay}
                        name="isOtherDay"
                        color="primary"
                    />
                    }
                    label="Làm việc ngoài giờ"
                />
            </Grid>
            {values.isOtherDay
              ? <Grid
                    container
                    spacing={3}
                  >
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                          <TextField
                            fullWidth
                            label="Số giờ làm thêm"
                            name="otherDay"
                            onChange={handleChange}
                            value={values.otherDay}
                            variant="outlined"
                          />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                          <TextField
                            fullWidth
                            label="Mức lương làm thêm"
                            name="salaryRangeOtherDay"
                            onChange={handleChange}
                            value={values.salaryRangeOtherDay}
                            variant="outlined"
                          />
                      </Grid>
                  </Grid>
                : <Grid/>
            }
            <Grid
              item
              md={12}
              xs={12}
            >
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={values.isOverTime}
                        onChange={handleChecked}
                        name="isOverTime"
                        color="primary"
                    />
                    }
                    label="Làm việc trên 8h"
                />
            </Grid>
            { values.isOverTime
                ? <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <TextField
                        fullWidth
                        helperText="Tiền ăn hỗ trợ mỗi nhân viên là 20k/ngày."
                        label="Số ngày làm trên 8h"
                        name="over8HoursDay"
                        onChange={handleChange}
                        //required
                        value={values.over8HoursDay}
                        variant="outlined"
                    />
                </Grid>
                : <Grid/>
            }
          </Grid>
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
            onClick={() => {
              handleSubmit();
              handleApiResponse();
              //handleRemoveItemInAutocomplete();
            }}
          >
            Thêm
          </Button>
        </Box>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          p={2}
        >
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            Tổng tiền lương: 
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
            style={{ marginLeft: 5, color: 'red' }}
          >
            <CurrencyFormat value={`${total}`} displayType={'text'} thousandSeparator={true}/> 
          </Typography>
        </Box>
      </Card>
    </form>
  );
};

SalaryDetails.propTypes = {
  className: PropTypes.string
};

export default SalaryDetails;
