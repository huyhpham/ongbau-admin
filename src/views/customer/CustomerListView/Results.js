import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';

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

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();

  const updateCustomer = (updateData) => {
    console.log('Hello', updateData);
  }

  const itemsHeader = [
    {
      id: 1,
      title: "Kho",
      field: "total",
    },
    {
      id: 2,
      title: "Nhập",
      field: "importData"
    },
    {
      id: 3,
      title: "Xuất",
      field: "exportData"
    },
    {
      id: 4,
      title: "Còn lại tại quầy",
      field: "leftData",
    },
    {
      id: 5,
      title: "Sử dụng",
      field: "usedData"
    },
    {
      id: 6,
      title: "Active",
      field: "date",
      render: row => <span>{  moment(row["created_date"]).format('DD/MM/YYYY') }</span>
    },
  ]

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <MaterialTable
        title=""
        columns={itemsHeader}
        data={customers}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...customers];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  updateCustomer(dataUpdate[index]);

                  resolve();
                }, 1000);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
        }}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
