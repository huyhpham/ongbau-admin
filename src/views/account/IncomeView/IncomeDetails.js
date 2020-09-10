import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import { getWeekOfMonth } from '../../../utils/groupBy';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  Snackbar,
  Typography,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import * as appActions from '../../../store/actions/app';

import IncomeResults from './IncomeResult';

const useStyles = makeStyles(() => ({
  root: {}
}));

const SalaryDetails = ({ className, ...rest }) => {
    const classes = useStyles(),
        dispatch = useDispatch(),
        success = useSelector(state => state.error.success),
        drinkItemList = useSelector(state => state.app.drinkList),
        inputRef = useRef(null);

    const [values, setValues] = useState({
            date: '',
        }),
        [open, setOpen] = useState(false),
        [total, setTotal] = useState(0),
        [initialData, setInitialData] = useState(undefined),
        [filename, setFilename] = useState(''),
        [currentSheet, setCurrentSheet] = useState([]);

    useEffect(() => {
        const today = moment().format('YYYY-MM-DD');
        setValues({
            ...values,
            date: today
        })
    }, []);

    useEffect(() => {
        const handleOpen = (success) => {
            setOpen(success);
        }

        if(success) {
            handleApiResponse(success);
            handleOpen(success);
        }
    }, [success]);

    const handleChange = (event) => {
        setValues({
        ...values,
        [event.target.name]: event.target.value
        });
    };

    const handleApiResponse = (success) => {
        if (success) {
            setCurrentSheet([]);
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
        const incomeItem = {
            date: values.date,
            data: currentSheet,
            totalMoney: total,
            week: getWeekOfMonth(values.date)
        }

        dispatch(appActions.addIncomeItem(incomeItem));
    };

    const handleUpload = (event) => {
        const file = event.target.files[0];
        setFilename(event.target.files[0].name);
 
        //read excel file
        readFile(file)
        .then((readedData) => {setInitialData(readedData);})
        .catch((error) => console.error(error));
    };

    const handleGenerateExcelToJson = (value) => {
        const result = generateObjects(value);
        let tempArray = [];
        let money = 0;
        let total = 0;
        drinkItemList.forEach((item1) => {
            result.forEach((item2) => {
                if(item1.name === item2.ITEM_NAME) {
                    money = parseFloat(item1.price) * parseFloat(item2.QUANTITY);
                    total += Number(money);
                    const tempObj = {
                        name: item1.name,
                        quantity: item2.QUANTITY,
                        price: money +'000',
                        unity: item2.UNIT
                    }
                    tempArray.push(tempObj);
                } 
            })
        });
        setCurrentSheet(tempArray);
        setTotal(total + '000');
        // console.log(total);
        // console.log(tempArray);
        // console.log(result);
    }

    return (
        <form
            autoComplete="off"
            noValidate
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
        <Card>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <CardHeader
                    subheader={filename !== "" ? `${'Upload successful file: '}${filename}` : 'No item chosen.'}
                    title={`${"Thu nhập ngày: "}${moment(values.date).format('DD-MM-YYYY')}`}
                />
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <TextField
                        label="Ngày bán"
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
                        style={{ marginRight: 15 }}
                    />
                    <input 
                        ref={inputRef}
                        type='file'
                        accept='.xlsx'
                        onChange={handleUpload}
                        style={{ display: 'none' }}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={e => {
                            inputRef.current.click()
                        }}
                        style={{ marginRight: 10 }}
                    >
                        Upload File
                    </Button>
                </Box>
                
            </Box>
            <Divider />
            <CardContent>
                <div
                    style={{ display: 'none' }}
                >
                    <ReactExcel
                        initialData={initialData}
                        onSheetUpdate={(currentSheet) => {handleGenerateExcelToJson(currentSheet);}}
                        activeSheetClassName='active-sheet'
                        reactExcelClassName='react-excel'
                    />
                </div>
                <IncomeResults customers={currentSheet}/>
            </CardContent>
            <Divider />
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                p={2}
            >
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                >
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                    >
                        Tổng thu nhập: 
                    </Typography>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                        style={{ marginLeft: 5, color: 'red' }}
                    >
                        <CurrencyFormat value={`${total}`} displayType={'text'} thousandSeparator={true}/> 
                    </Typography>
                </Box>
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
        </form>
    );
};

SalaryDetails.propTypes = {
  className: PropTypes.string
};

export default SalaryDetails;
