import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import * as appActions from '../../../store/actions/app';
import CurrencyFormat from 'react-currency-format';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  arrowUpIcon: {
    color: colors.green[900]
  },
  arrowDownIcon: {
    color: colors.red[900]
  },
  increaseValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  },
  decreaseValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalCustomers = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch(),
    incomeList = useSelector(state => state.app.incomeList),
    [values, setValues] = useState({
      date: '',
      yesterday: '',
      previousYesterday: ''
    }),
    [increase, setIncrease] = useState(null),
    [yesterdayMoney, setYesterdayMoney] = useState(''),
    [previousYesterdayMoney, setPreviousYesterdayMoney] = useState(''),
    [increaseNumber, setIncreaseNumber] = useState(0);

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const previousYesterday = moment().subtract(2, 'days').format('YYYY-MM-DD');
    setValues({
      ...values,
      date: today,
      yesterday: yesterday,
      previousYesterday: previousYesterday
    });
  }, []);
  
  useEffect(() => {
    if (incomeList.length !== 0) {
      incomeList.forEach((item) => {
        if (item.date === values.yesterday) {
          setYesterdayMoney(item.totalMoney);
        }
        if (item.date === values.previousYesterday) {
          setPreviousYesterdayMoney(item.totalMoney);
        }
      });
    }
    
  }, [incomeList]);

  useEffect(() => {
    if (yesterdayMoney !== '') {
      const value = parseFloat(yesterdayMoney)/parseFloat(previousYesterdayMoney) - 1;
      if (value > 0) {
        setIncrease(true);
        setIncreaseNumber((Math.abs(value) * 100).toFixed(2));
      } else {
        setIncrease(false);
        setIncreaseNumber((Math.abs(value) * 100).toFixed(2));
      }
    }
    
  }, [yesterdayMoney]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              {`${'Thu nhập ngày: '}${moment(values.yesterday).format('DD-MM-YYYY')}`}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              <CurrencyFormat value={yesterdayMoney} displayType={'text'} thousandSeparator={true}/>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          {increase 
            ? <ArrowUpwardIcon className={classes.arrowUpIcon} />
            : <ArrowDownwardIcon className={classes.arrowDownIcon} />
          }
          <Typography
            className={increase ? classes.increaseValue :  classes.decreaseValue}
            variant="body2"
          >
            {increaseNumber} {'%'}
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            {`${'so với ngày: '}${moment(values.previousYesterday).format('DD-MM-YYYY')}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
