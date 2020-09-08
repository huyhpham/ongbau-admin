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

const SalaryResults = ({ className, customers, ...rest }) => {
  const classes = useStyles(),
    [month, setMonth] = useState(null),
    [year, setYear] = useState(null);

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    setYear(year);
    setMonth(month);
    
  }, []);

  const updateCustomer = (updateData) => {
    console.log('Hello', updateData);
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <MaterialTable
        title="Bảng lương nhân viên"
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
          exportButton: true,
          exportFileName: `Bảng lương tháng ${month}${'/'}${year}`,
        }}
        actions={[
          {
            icon: 'save',
            tooltip: 'Save',
            isFreeAction: true,
            onClick: () => {
              console.log('Hello')
            }
          },
        ]}
      />
    </Card>
  );
};

const itemsHeader = [
  {
      id: 7,
      title: "Ngày tính lương",
      field: "date",
      render: row => <span>{  moment(row["date"]).format('DD/MM/YYYY') }</span>
  },
  {
      id: 1,
      title: "Nhân viên",
      field: "employeeName",
  },
  {
    id: 2,
    title: "Chức vụ",
    field: "positionName",
  },
  {
      id: 3,
      title: "Số giờ làm trong tuần",
      field: "normalDay"
  },
  {
      id: 4,
      title: "Số giờ làm cuối tuần",
      field: "weekendDay"
  },
  {
      id: 5,
      title: "Số giờ làm ngày lễ",
      field: "holiday",
  },
  {
      id: 6,
      title: "Số giờ làm ngoài giờ",
      field: "otherDay"
  },
  {
      id: 8,
      title: "Tiền lương",
      field: "totalMoney",
      render: row => <span><CurrencyFormat value={`${row["totalMoney"]}`} displayType={'text'} thousandSeparator={true}/></span>
  }
];

SalaryResults.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default SalaryResults;
