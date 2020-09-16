import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getWeekOfMonth } from '../../../utils/groupBy';
import * as appActions from '../../../store/actions/app';
import CurrencyFormat from 'react-currency-format';
import {
  Card,
  makeStyles,
  Button,
  Box,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import MaterialTable from 'material-table';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const GoodsResults = ({ className, customers, ...rest }) => {
  const classes = useStyles(),
    dispatch = useDispatch(),
    [values, setValues] = useState({
      date: '',
      month: '',
      year: '',
    }),
    [total, setTotal] = useState(0),
    success = useSelector(state => state.error.success),
    [open, setOpen] = useState(false);

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    setValues({
        ...values,
        date: today,
        month: moment(today).format('M'),
        year: moment(today).format('YYYY')
    });
  }, []);

  // useEffect(() => {
  //   if (customers.length !== 0) {
  //     let total = 0;
  //     customers.forEach((item) => {
  //       total += Number(item.totalMoney);
  //     });
  //     setTotal(total);
  //   } else {
  //     setTotal(0);
  //   }
  // }, [customers]);

  useEffect(() => {
    const handleOpen = (success) => {
        setOpen(success);
    }

    if(success) {
        handleApiResponse(success);
        handleOpen(success);
    }
  }, [success]);

  const handleApiResponse = (success) => {
    if(success) {
      dispatch(appActions.addNewEmployeeList([]));
      setTotal(0);
    }
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
    const salaryItem = {
      date: values.date,
      month: values.month,
      year: values.year,
      week: getWeekOfMonth(values.date),
      data: customers,
      totalMoney: total
    }

    dispatch(appActions.addEmployeeSalary(salaryItem));
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
          <Alert onClose={handleClose} severity="success">
            Update Successfully!
          </Alert>
      </Snackbar>
      <MaterialTable
        title="Bảng lương nhân viên"
        columns={itemsHeader}
        data={customers}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          exportButton: true,
          exportFileName: `Bảng lương tháng ${values.month}${'/'}${values.year}`,
        }}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => {
              let tempArray = [];
              tempArray = customers.filter(function( obj ) {
                return obj.employeeName !== rowData.employeeName;
              });

              dispatch(appActions.addNewEmployeeList(tempArray));
            }
          },
        ]}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        p={2}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
              handleSubmit();
          }}
        >
          Lưu
        </Button>
      </Box>
      
    </Card>
  );
};

const itemsHeader = [
  {
    id: 5,
    title: "Ngày nhập hàng",
    field: "date",
    render: row => <span>{moment(row["date"]).format('DD/MM/YYYY')}</span>
  },
  {
    id: 1,
    title: "Tên nguyên liệu",
    field: "goodsName"
  },
  {
    id: 2,
    title: "ĐVT",
    field: "unit"
  },
  {
    id: 3,
    title: "Số lượng",
    field: "quantity"
  },
  {
    id: 4,
    title: "Giá tiền",
    field: "price"
  },
];

GoodsResults.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default GoodsResults;
