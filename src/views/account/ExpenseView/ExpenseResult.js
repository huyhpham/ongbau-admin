import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import * as appActions from '../../../store/actions/app';
import { getWeekOfMonth } from '../../../utils/groupBy';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const ExpenseResult = ({ className, ...rest }) => {
    const classes = useStyles(),
        dispatch = useDispatch();
    const expenseItem = useSelector(state => state.app.expenseItem),
        [today, setToday] = useState(''),
        [week, setWeek] = useState('');

    useEffect(() => {
        const today = moment().format('YYYY-MM-DD');
        setWeek(getWeekOfMonth(today));
        setToday(today);
        dispatch(appActions.getExpenseItem({}));
    }, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            style={{ marginLeft: 5 }}
        >
            <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
            >
                {`${'Thu chi tuần - '}${week}${' tháng:'}`}  
            </Typography>
            <Typography
                color="textPrimary"
                gutterBottom
                variant="h4"
                style={{ marginLeft: 10 }}
            >
                {Object.keys(expenseItem).length === 0 ? moment(today).format('MM - YYYY') : moment(expenseItem.date).format('MM - YYYY')}
            </Typography>
        </Box>
        <Divider
            style={{ marginBottom: 10 }}
        />
        <Grid
            item
            md={12}
            xs={12}
            style={{ marginLeft: 5 }}
        >
            <Typography
                color="textPrimary"
                gutterBottom
                variant="h4"
            >
                Tiền chi 
            </Typography>
        </Grid>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          style={{ marginLeft: 15 }}
        >
          <Box
            display="flex"
            flexDirection="column"
          >
            <Typography
            color="textSecondary"
            gutterBottom
            variant="h5"
            >
              Nguyên vật liệu:
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Mặt bằng;
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Điện
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Nước
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Internet
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            ml={2}
          >
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {Object.keys(expenseItem).length === 0 ? '0' : <CurrencyFormat value={`${expenseItem.itemFee}`} displayType={'text'} thousandSeparator={true}/>}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {Object.keys(expenseItem).length === 0 ? '0' : <CurrencyFormat value={`${expenseItem.placeFee}`} displayType={'text'} thousandSeparator={true}/>}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {Object.keys(expenseItem).length === 0 ? '0' : <CurrencyFormat value={`${expenseItem.electricFee}`} displayType={'text'} thousandSeparator={true}/>}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {Object.keys(expenseItem).length === 0 ? '0' : <CurrencyFormat value={`${expenseItem.waterFee}`} displayType={'text'} thousandSeparator={true}/>}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {Object.keys(expenseItem).length === 0 ? '0' : <CurrencyFormat value={`${expenseItem.internetFee}`} displayType={'text'} thousandSeparator={true}/>}
            </Typography>
          </Box>
        </Box>
        <Grid
            item
            md={12}
            xs={12}
            style={{ marginTop: 10, marginLeft: 5 }}
        >
            <Typography
                color="textPrimary"
                gutterBottom
                variant="h4"
            >
                Tiền thu 
            </Typography>
        </Grid>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          style={{ marginLeft: 15 }}
        >
          <Box
            display="flex"
            flexDirection="column"
          >
            <Typography
            color="textSecondary"
            gutterBottom
            variant="h5"
            >
              Tiền thu nhập:
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            ml={3.5}
          >
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {Object.keys(expenseItem).length === 0 ? '0' : <CurrencyFormat value={`${expenseItem.incomeFee}`} displayType={'text'} thousandSeparator={true}/>}
            </Typography>
          </Box>
        </Box>
        <Divider
            style={{ marginBottom: 10, marginTop: 10 }}
        />
        <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            style={{ marginLeft: 5 }}
        >
            <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
            >
                Tiền lãi:  
            </Typography>
            <Typography
                color="textPrimary"
                gutterBottom
                variant="h4"
                style={{ marginLeft: 10 }}
            >
                {Object.keys(expenseItem).length === 0 ? '0' : <CurrencyFormat value={`${expenseItem.totalInterestMoney}`} displayType={'text'} thousandSeparator={true}/>}
            </Typography>
        </Box>
      </CardContent>
      
      {/* <Divider /> */}
      {/* <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

ExpenseResult.propTypes = {
  className: PropTypes.string
};

export default ExpenseResult;
