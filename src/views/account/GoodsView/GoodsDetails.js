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

const GoodsDetails = ({ className, ...rest }) => {
  const classes = useStyles(),
    employeeList = useSelector(state => state.app.employeeList),
    employeeSalaryList = useSelector(state => state.app.employeeSalaryList),
    salaryList = useSelector(state => state.app.salaryList),
    dispatch = useDispatch();
  const [values, setValues] = useState({
        unit: '',
        quantity: 0,
        price: 0,
        date: ''
    }),
    [open, setOpen] = useState(false),
    [goodsName, setGoodsName] = useState(null),
    [inputValue, setInputValue] = useState(''),
    [newEmployeeList, setNewEmployeeList] = useState([]),
    [total, setTotal] = useState(0);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleApiResponse = () => {
    setValues({
      ...values,
      unit: '',
      quantity: 0,
      price: 0,
      date: ''
    });
    setGoodsName(null);
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
    // let totalMoney = 0;
    // if (values.isOverTime) {
    //     if(values.isOtherDay) {
    //       totalMoney = (values.salaryRangeNormal * values.normalDay + values.salaryRangeWeekend * values.weekendDay 
    //           + values.salaryRangeHoliday * values.holiday + 20 * values.over8HoursDay + values.otherDay * values.salaryRangeOtherDay);
    //     } else {
    //       totalMoney = (values.salaryRangeNormal * values.normalDay + values.salaryRangeWeekend * values.weekendDay 
    //           + values.salaryRangeHoliday * values.holiday + 20 * values.over8HoursDay);
    //     }
        
    // } else {
    //     if(values.isOtherDay) {
    //       totalMoney = (values.salaryRangeNormal * values.normalDay + values.salaryRangeWeekend * values.weekendDay 
    //           + values.salaryRangeHoliday * values.holiday + values.otherDay * values.salaryRangeOtherDay);
    //     } else {
    //       totalMoney = (values.salaryRangeNormal * values.normalDay + values.salaryRangeWeekend * values.weekendDay 
    //           + values.salaryRangeHoliday * values.holiday);
    //     }
    // }

    const employee = {
      goodsName: goodsName,
      unit: values.unit,
      quantity: values.quantity,
      price: values.price,
      date: values.date,
      //totalMoney: totalMoney + '000'
    }

    console.log(employee);

    // dispatch(appActions.getEmployeeSalaryList(employee));
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
          title="Bảng nhận hàng"
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
              <TextField
                fullWidth
                label="Ngày nhận hàng"
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
              md={6}
              xs={12}
            >
              <Autocomplete
                id="combo-box-demo"
                value={goodsName}
                options={newEmployeeList.map((option) => option.name)}
                onChange={(event, value) => {setGoodsName(value); handleGetPosition(value);}}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Tên nguyên liệu" variant="outlined" />}
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
                label="Số lượng"
                name="positionName"
                onChange={handleChange}
                required
                value={values.quantity}
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
                label="Thành tiền"
                name="normalDay"
                onChange={handleChange}
                required
                value={values.price}
                variant="outlined"  
              />
            </Grid>
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
            Tổng tiền: 
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

GoodsDetails.propTypes = {
  className: PropTypes.string
};

export default GoodsDetails;
