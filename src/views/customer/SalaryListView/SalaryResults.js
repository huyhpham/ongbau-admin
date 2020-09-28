import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { groupBy, getWeekOfMonth } from '../../../utils/groupBy';
import {
  Box,
  Card,
  Divider,
  Grid,
  makeStyles,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SalaryTableResults from './SalaryTableResults';

const useStyles = makeStyles(() => ({
  root: {}
}));

const SalaryListResults = ({ className, ...rest }) => {
    const classes = useStyles(),
        employeeSalary = useSelector(state => state.app.employeeSalary);

    const [formatData, setFormatData] = useState([]),
        [state, setState] = useState({
            month: 0,
            week: 0,
            year: 0,
            date: ''
        }),
        [total, setTotal] = useState(0);

    useEffect(() => {
        if(employeeSalary.length !== 0) {
            const tempArray = groupBy(employeeSalary);
            //setFormatData(tempArray);
            const today = moment().format('YYYY-MM-DD');
            const month = moment().format('M');
            const week = getWeekOfMonth(today);
            const year = moment().format('YYYY');

            let total = 0;
            let newArray = [];
            employeeSalary.forEach((item) => {
                console.log(item);
                total += Number(item.totalMoney);
                item.data.forEach(item => {
                    newArray.push(item);
                });
            });

            var output = [];
            newArray.forEach(function(item) {
                var existing = output.filter(function(v, i) {
                    return v.employeeName == item.employeeName;
                });
                if (existing.length) {
                    var existingIndex = output.indexOf(existing[0]);
                    output[existingIndex].totalMoney = output[existingIndex].totalMoney.concat(item.totalMoney);
                } else {
                    if (typeof item.totalMoney == 'string')
                    item.totalMoney = [item.totalMoney];
                    output.push(item);
                }
            });
            setTotal(total);
            const obj = {
                month: month,
                week: week,
                year: year,
                date: employeeSalary[employeeSalary.length - 1].date,
                data: output,
            };
            const newData = [];
            newData.push(obj);
            setFormatData(groupBy(newData));
        } else {
            setTotal(0);
        }
    }, [employeeSalary]);

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            {formatData.length !== 0 ? formatData.map((item, index) => {
                return <div
                    key={index}
                >
                    <Grid
                        item
                        md={12}
                        xs={12}
                        style={{ padding: 10 }}
                    >
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                            {`${'Năm '}${item.year}`}
                        </Typography>
                    </Grid>
                    {item.data.map((item, index) => {
                        return <div
                                key={index}
                            >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                   
                                >
                                    {/* <Typography className={classes.heading}>{`${'Tháng '}${item.month}`}</Typography> */}
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                    >
                                        <Box
                                            alignItems="center"
                                            display="flex"
                                            flexDirection="row"
                                            style={{ marginLeft: 15, marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}
                                        >
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                                style={{ width: '30%' }}
                                            >
                                                {`${'Tháng '}${item.month}`} 
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                variant="body2"
                                                style={{ marginLeft: 5, fontWeight: '600'}}
                                            >
                                                {`${'Tổng tiền lương phải trả: '}`}
                                                <CurrencyFormat
                                                    value={`${total}`}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    style={{ color: 'red'}}
                                                />
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails
                                    style={{ display: 'flex', flexDirection: 'column', paddingTop: 0 }}
                                >
                                    {item.data.map((item, index) => {
                                        
                                            return <div
                                                    key={index}
                                                >
                                                {item.data.map((item, index) => {
                                                    return <div key={index}>
                                                            <Accordion>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon />}
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                >
                                                                    <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                    >
                                                                        <Box
                                                                            alignItems="center"
                                                                            display="flex"
                                                                            flexDirection="row"
                                                                            style={{ marginLeft: 15, marginTop: 10 }}
                                                                        >
                                                                            <Typography
                                                                                color="textSecondary"
                                                                                variant="body2"
                                                                            >
                                                                                {`${'Ngày quản lý tính lương: '}`} 
                                                                            </Typography>
                                                                            <Typography
                                                                                color="textSecondary"
                                                                                variant="body2"
                                                                                style={{ marginLeft: 5, fontWeight: '600'}}
                                                                            >
                                                                                {`${moment(item.date).format('DD-MM-YYYY')}`} 
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <SalaryTableResults 
                                                                        customers={item.data}
                                                                        style={{ marginTop: 10, width: '100%' }}
                                                                        date={item.date}
                                                                    />
                                                                </AccordionDetails>
                                                            </Accordion>
                                                    </div>
                                                })}
                                            </div>
                                        })}
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    })}
                </div>
            }) : <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                    style={{
                        marginLeft: 15,
                        marginTop: 10,
                        paddingBottom: 5,
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                >
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        NO ITEM TO SHOW
                    </Typography>
                </Box>}
        </Card>
    );
};

SalaryListResults.propTypes = {
  className: PropTypes.string
};

export default SalaryListResults;
