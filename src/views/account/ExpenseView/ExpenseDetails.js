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
import moment from 'moment';
import { getWeekOfMonth } from '../../../utils/groupBy';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ExpenseDetails = ({ className, ...rest }) => {
    const classes = useStyles(),
        employeeList = useSelector(state => state.app.employeeList),
        employeeSalaryList = useSelector(state => state.app.employeeSalaryList),
        salaryList = useSelector(state => state.app.salaryList),
        dispatch = useDispatch();
    const [values, setValues] = useState({
            isOtherFee: false,
            itemFee: 0,
            placeFee: 33,
            electricFee: 0,
            waterFee: 0,
            internetFee: 0,
            employeeFee: 0,
            otherFee: 0,
            otherFeeName: '',
            incomeFee: 0,
            month: 0,
            year: 0,
            week: 0
        }),
        [open, setOpen] = useState(false);

    useEffect(() => {
        const today = moment().format('YYYY-MM-DD');
        const month  = moment(today).format('M');
        const year = moment(today).format('YYYY');
        setValues({
            ...values,
            month: month,
            year: year,
            week: getWeekOfMonth(today)
        });
    }, []);

    const handleChange = (event) => {
        setValues({
        ...values,
        [event.target.name]: event.target.value
        });
    };

    const handleCheckedOtherDay = () => {
        setValues({
            ...values,
            isOtherFee: !values.isOtherFee
        });
    }

    const handleApiResponse = () => {
        setValues({
            ...values,
            isOtherFee: false,
            itemFee: 0,
            electricFee: 0,
            waterFee: 0,
            internetFee: 0,
            employeeFee: 0,
            otherFee: 0,
            otherFeeName: '',
            incomeFee: 0,
        });
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
        const today = moment().format('YYYY-MM-DD');
        let interestMoney = 0;
        let usedMoney = 0;
        if(values.isOtherFee) {
            usedMoney = parseFloat(values.itemFee) + parseFloat(values.placeFee) 
                + parseFloat(values.electricFee) + parseFloat(values.waterFee) + parseFloat(values.internetFee) + parseFloat(values.otherFee);
            interestMoney = parseFloat(values.incomeFee) - parseFloat(usedMoney);
        } else {
            usedMoney = parseFloat(values.itemFee) + parseFloat(values.placeFee) 
                + parseFloat(values.electricFee) + parseFloat(values.waterFee) + parseFloat(values.internetFee);
            interestMoney = parseFloat(values.incomeFee) - parseFloat(usedMoney);
        }
        
        const expenseItem = {
            isOtherFee: values.isOtherFee + '000',
            itemFee: values.itemFee + '000',
            placeFee: values.placeFee + '000',
            electricFee: values.electricFee + '000',
            waterFee: values.waterFee + '000',
            internetFee: values.internetFee + '000',
            employeeFee: values.employeeFee + '000',
            otherFee: values.otherFee + '000',
            otherFeeName: values.otherFeeName,
            incomeFee: values.incomeFee + '000',
            totalUsedMoney: usedMoney + '000',
            totalIncomeMoney: values.incomeFee + '000',
            totalInterestMoney: interestMoney + '000',
            date: today,
            month: values.month,
            year: values.year,
            week: values.week
        }

        console.log(expenseItem);
        dispatch(appActions.getExpenseItem(expenseItem));
        dispatch(appActions.addExpenseItem(expenseItem));
    };

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
          subheader="Nhớ kiểm tra số liệu cẩn thận."
          title={`Bảng tính thu chi tuần ${values.week} - tháng${' '}${values.month}${' - '}${values.year}`}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
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
                    Tiền chi: 
                </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                //helperText="Please specify the first name"
                label="Nguyên vật liệu"
                name="itemFee"
                onChange={handleChange}
                required
                value={values.itemFee}
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
                    label="Mặt bằng"
                    name="placeFee"
                    onChange={handleChange}
                    required
                    value={values.placeFee}
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
                    label="Điện"
                    name="electricFee"
                    onChange={handleChange}
                    required
                    value={values.electricFee}
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
                    label="Nước"
                    name="waterFee"
                    onChange={handleChange}
                    value={values.waterFee}
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
                    label="Internet"
                    name="internetFee"
                    onChange={handleChange}
                    required
                    value={values.internetFee}
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
                        checked={values.isOtherFee}
                        onChange={handleCheckedOtherDay}
                        name="isOtherDay"
                        color="primary"
                    />
                    }
                    label="Chi phí phát sinh khác"
                />
            </Grid>
            {values.isOtherFee
              ? <Grid
                    container
                    spacing={3}
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                  >
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                          <TextField
                            fullWidth
                            label="Tên chi phí phát sinh"
                            name="otherFeeName"
                            onChange={handleChange}
                            value={values.otherFeeName}
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
                            label="Chi phí phát sinh"
                            name="otherFee"
                            onChange={handleChange}
                            value={values.otherFee}
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
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    Tiền thu: 
                </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                    fullWidth
                    label="Thu nhập tháng này"
                    name="incomeFee"
                    onChange={handleChange}
                    value={values.incomeFee}
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
            }}
          >
            Lưu
          </Button>
        </Box>
        {/* <Box
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
        </Box> */}
      </Card>
    </form>
  );
};

ExpenseDetails.propTypes = {
  className: PropTypes.string
};

export default ExpenseDetails;
