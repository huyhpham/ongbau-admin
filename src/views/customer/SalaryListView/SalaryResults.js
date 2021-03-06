import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { groupByYear, getWeekOfMonth, groupByMonth, mergeValueOfTheSameObject, removeDuplicateValueInArray } from '../../../utils/groupBy';
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
    
    const totalMoney = (array) => {
        let total = 0;
        array.forEach((item) => {
            if(item.totalMoney.length !== 1) {
                total += item.totalMoney.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
            } else {
                total += Number(item.totalMoney);
            }
        });
        
        return total;
    }

    useEffect(() => {
        const formatEmployeeSalary = async (employeeSalary) => {
            if(employeeSalary.length !== 0) {
                const tempArray = await groupByMonth(employeeSalary);
                let newTotalArray = [];
    
                await tempArray.forEach((item1) => {
                    item1.data.forEach((item2) => {
                        var newArray = [];
                        item2.data.forEach((item3) => {
                            item3.data.map((item4) => {
                                newArray.push(item4);
                            });
                            
                            const newObj = {
                                year: item1.year,
                                month: item2.month,
                                data: newArray,
                            }
                            newTotalArray.push(newObj);
                            
                        });
                    });
                });

                var result = await newTotalArray.reduce((unique, o) => {
                    if(!unique.some(obj => obj.year === o.year && obj.month === o.month)) {
                      unique.push(o);
                    }
                    return unique;
                },[]);
    
                await result.forEach((item, index) => {
                    var value = mergeValueOfTheSameObject(item.data);
                    result[index].data = value;
                });
                setFormatData(groupByYear(result));
            } else {
                setTotal(0);
            }
        }

        formatEmployeeSalary(employeeSalary);
        
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
                                                    value={`${totalMoney(item.data)}`}
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
                                    <AccordionDetails>
                                        <SalaryTableResults 
                                            customers={item.data}
                                            style={{ marginTop: 10, width: '100%' }}
                                            date={item.date}
                                        />
                                    </AccordionDetails>
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
