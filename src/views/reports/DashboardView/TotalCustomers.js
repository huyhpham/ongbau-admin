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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import * as appActions from '../../../store/actions/app';

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
    // [currMonth, setCurrMonth] = useState(0),
    // [lastMonth, setLastMonth] = useState(0),
    currMonth = useSelector(state => state.app.currMonthCustomer),
    lastMonth = useSelector(state => state.app.lastMonthCustomer),
    [increase, setIncrease] = useState(null),
    [increasePercentage, setIncreasePercentage] = useState(0),
    customerList = useSelector(state => state.app.customerList);
  
  const getMonthYearValue = (current) => {
    let currMonthValue = {};
    const currDate = moment(),
      month = currDate.format('M'),
      year  = currDate.format('YYYY');
    if (current) {
      currMonthValue = {
        month: month,
        year: parseInt(year)
      }
    } else {
      currMonthValue = {
        month: month - 1,
        year: parseInt(year)
      }
    }
    
    return currMonthValue;
  }

  const handleGetCurrCustomerListByMonth = async () => {
    const currMonthValue = await getMonthYearValue(true);
    dispatch(appActions.getCustomerListByMonth(currMonthValue, true));
  }

  const handleGetLastCustomerListByMonth = async () => {
    const lastMonthValue = await getMonthYearValue(false);
    dispatch(appActions.getCustomerListByMonth(lastMonthValue, false));
  }

  useEffect(() => {
    handleGetCurrCustomerListByMonth();
    handleGetLastCustomerListByMonth();
  }, []);

  useEffect(() => {
    console.log(currMonth);
    console.log(lastMonth);
    if (currMonth - lastMonth > 0) {
      setIncrease(true);
      setIncreasePercentage(Math.floor(((currMonth - lastMonth) / (currMonth + lastMonth)) * 100));
    } else {
      setIncrease(false);
      setIncreasePercentage(Math.floor((Math.abs(currMonth - lastMonth) / (currMonth + lastMonth)) * 100));
    }
  }, [currMonth, lastMonth]);

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
              TOTAL CUSTOMERS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {customerList.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
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
            {increasePercentage} {'%'}
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
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
