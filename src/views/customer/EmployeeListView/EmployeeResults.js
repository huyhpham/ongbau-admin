import React, { useState, useEffect } from 'react';
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

const EmployeeResults = ({ className, customers, ...rest }) => {
  const classes = useStyles();

  const updateCustomer = (updateData) => {
    console.log('Hello', updateData);
  }

  const itemsHeader = [
    {
      id: 5,
      title: "Date",
      field: "date",
      render: row => <span>{  moment(row["date"]).format('DD/MM/YYYY') }</span>
    },
    {
      id: 1,
      title: "Nhân viên",
      field: "name",
    },
    {
      id: 2,
      title: "Điện thoại",
      field: "phone",
    },
    {
      id: 3,
      title: "Chức vụ",
      field: "position"
    },
    {
      id: 4,
      title: "Tình trạng",
      field: "is_active",
      render: row => <span>{ row["is_active"] ? "Đang làm" : "Nghỉ việc" }</span>
    },
  ];

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
          //filtering: true
        }}
      />
    </Card>
  );
};

EmployeeResults.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default EmployeeResults;
