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
    [total, setTotal] = useState(0);

  useEffect(() => {
    if(incomeList.length !== 0) {
      const sum = incomeList.reduce((a, { totalMoney }) => a + parseFloat(totalMoney), 0);
      setTotal(sum);
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
              Tổng thu nhập:
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
