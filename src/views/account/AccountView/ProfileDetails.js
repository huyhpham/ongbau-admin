import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../../../store/actions/app';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles(),
    success = useSelector(state => state.error.success),
    dispatch = useDispatch();
  const [values, setValues] = useState({
      itemName: '',
      total: '',
      importData: '',
      exportData: '',
      leftData: '',
      usedData: '',
      date: '',
    }),
    [open, setOpen] = useState(false),
    [today, setToday] = useState(''),
    [itemName, setItemName] = useState(null),
    [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const handleApiResponse = (success) => {
    if (success) {
      setValues({
        ...values,
        total: '',
        importData: '',
        exportData: '',
        leftData: '',
        usedData: '',
        date: '',
      });
      setItemName('');
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
    const newItem = {
      itemName: itemName,
      total: values.total,
      importData: values.importData,
      exportData: values.exportData,
      leftData: values.leftData,
      usedData: parseFloat(values.exportData) - parseFloat(values.leftData),
      date: values.date
    }

    dispatch(appActions.getNewItem(newItem));
    dispatch(appActions.addNewItem(newItem));
  }

  useEffect(() => {
    const handleOpen = (success) => {
      setOpen(success);
    }
  
    if(success) {
      handleApiResponse(success);
      handleOpen(success);
    }
  }, [success]);

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    console.log(today);
    setValues({
      ...values,
      date: today,
    });
  }, []);

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success">
          Update Successfully!
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader
          subheader="Nhớ kiểm tra nguyên vật liệu sau mỗi ngày bán hàng."
          title="Kiểm tra nguyên vật liệu"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Autocomplete
                id="combo-box-demo"
                value={itemName}
                options={fakeData.map((option) => option.title)}
                onChange={(event, value) => setItemName(value)}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Tên nguyên liệu" variant="outlined" />}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Ngày kiểm tra"
                name="date"
                id="date"
                type="date"
                onChange={handleChange}
                required
                value={values.date}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                //helperText="Please specify the first name"
                label="Tồn kho"
                name="total"
                onChange={handleChange}
                required
                value={values.total}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nhập kho"
                name="importData"
                onChange={handleChange}
                //required
                value={values.importData}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Xuất kho"
                name="exportData"
                onChange={handleChange}
                //required
                value={values.exportData}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nguyên liệu còn lại tại quầy"
                name="leftData"
                onChange={handleChange}
                required
                value={values.leftData}
                variant="outlined"
              />
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nguyên liệu đã sử dụng"
                name="usedData"
                onChange={handleChange}
                //required
                value={values.usedData}
                variant="outlined"
              />
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleSubmit()}
          >
            Lưu
          </Button>
        </Box>
      </Card>
    </form>
  );
};

const fakeData = [
  { title: 'Si-rô', unit: 'chai' },
  { title: 'Sữa chua uống', unit: 'chai' },
  { title: 'Sữa chua ăn', unit: 'hũ' },
  { title: 'Coffee', unit: 'gói' },
];

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
