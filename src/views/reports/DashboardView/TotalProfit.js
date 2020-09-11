import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import { groupByMonth } from '../../../utils/groupBy';
import moment from 'moment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CurrencyFormat from 'react-currency-format';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const TotalProfit = ({ className, ...rest }) => {
  const classes = useStyles(),
    incomeList = useSelector(state => state.app.incomeList),
    [month, setMonth] = useState(''),
    [total, setTotal] = useState(0);

  useEffect(() => {
    const month = moment().format('M');
    setMonth(month);
    if(incomeList.length !== 0) {
      const tempArray = groupByMonth(incomeList);
      tempArray.forEach((item) => {
        item.data.forEach((item) => {
          if(item.month === month) {
            const sum = item.data.reduce((a, { totalMoney }) => a + parseFloat(totalMoney), 0);
            setTotal(sum);
          }
        });
      });
    } else {
      setTotal(0);
    }
  }, [incomeList]);

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
              {`${'Tổng thu nhập của tháng '}${month}`}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true}/>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
