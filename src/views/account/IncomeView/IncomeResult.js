import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

import {
  Card,
  makeStyles,
} from '@material-ui/core';
import MaterialTable from 'material-table';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const IncomeResults = ({ className, customers, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <MaterialTable
        title=""
        columns={itemsHeader}
        data={customers}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
        }}
      />
    </Card>
  );
};

const itemsHeader = [
  {
    id: 1,
    title: "Món",
    field: "name",
  },
  {
    id: 2,
    title: "Đơn vị tính",
    field: "unity",
  },
  {
    id: 3,
    title: "Số lượng",
    field: "quantity"
  },
  {
    id: 4,
    title: "Thành tiền",
    field: "price",
    render: row => <span><CurrencyFormat value={`${row["price"]}`} displayType={'text'} thousandSeparator={true}/></span>
  },
];

IncomeResults.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default IncomeResults;
