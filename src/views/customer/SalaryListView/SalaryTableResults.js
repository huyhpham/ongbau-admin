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

const SalaryTableResults = ({ className, customers, date, ...rest }) => {
  const classes = useStyles(),
    dispatch = useDispatch(),
    [values, setValues] = useState({
      date: '',
      month: '',
      year: '',
    }),
    [total, setTotal] = useState(0),
    [isEdit, setIsEdit] = useState(false),
    [open, setOpen] = useState(false),
    [data, setData] = useState([]),
    employeeSalary = useSelector(state => state.app.employeeSalary),
    success = useSelector(state => state.error.success);

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    setValues({
        ...values,
        date: today,
        month: moment(today).format('M'),
        year: moment(today).format('YYYY')
    });
  }, []);

  useEffect(() => {
    if (customers.length !== 0) {
      setData(customers);
    } else {
      setTotal([]);
    }
  }, [customers]);

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
    employeeSalary.forEach((item) => {
      if(item.date === date) {
        const salaryItem = {
          id: item._id,
          date: date,
          month: item.month,
          year: item.year,
          week: getWeekOfMonth(date),
          data: data,
          totalMoney: item.total
        }
        
        console.log(salaryItem);
        dispatch(appActions.updateEmployeeSalary(salaryItem));
      }
    });
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
        data={data}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          exportButton: true,
          exportFileName: `Bảng lương tháng ${values.month}${'/'}${values.year}`,
        }}
        // actions={[
        //   {
        //     icon: 'edit',
        //     tooltip: 'Edit User',
        //     onClick: async (event, rowData) => {
        //       await setIsEdit(true);
        //       // let tempArray = [];
        //       // tempArray = customers.filter(function( obj ) {
        //       //   return obj.employeeName !== rowData.employeeName;
        //       // });

        //       // dispatch(appActions.addNewEmployeeList(tempArray));
        //       console.log(rowData);
        //     }
        //   },
        // ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setIsEdit(true);
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve();
              }, 1000);
            }),
        }}
      />
      {
        isEdit 
        ? <Box
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
        : <div/>
      }
      
    </Card>
    
  );
};

const itemsHeader = [
  {
      id: 7,
      title: "Thời gian tính lương",
      field: "fromDate",
      field: "toDate",
      cellStyle: {
        width: '15%',
        maxWidth: 20,
      },
      align: "center",
      render: row => <span>{  `${moment(row["fromDate"]).format('DD/MM/YYYY')}${' - '}${moment(row["toDate"]).format('DD/MM/YYYY')}` }</span>
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

SalaryTableResults.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default SalaryTableResults;
