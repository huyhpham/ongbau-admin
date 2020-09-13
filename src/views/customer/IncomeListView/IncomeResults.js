import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { groupBy } from '../../../utils/groupBy';
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

const useStyles = makeStyles(() => ({
  root: {}
}));

const IncomeListResults = ({ className, ...rest }) => {
    const classes = useStyles(),
        incomeList = useSelector(state => state.app.incomeList);

    const [formatData, setFormatData] = useState([]);

    useEffect(() => {
        if(incomeList.length !== 0) {
            const tempArray = groupBy(incomeList);
            setFormatData(tempArray);
        }
    }, [incomeList]);

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            {formatData.map((item, index) => {
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
                                    <Typography className={classes.heading}>{`${'Tháng '}${item.month}`}</Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    style={{ display: 'flex', flexDirection: 'column' }}
                                >
                                    {item.data.map((item, index) => {
                                        
                                            return <div
                                                    key={index}
                                                >
                                                <Divider
                                                    style={{ marginBottom: 7 }}
                                                />
                                                <Typography
                                                    color="textPrimary"
                                                    gutterBottom
                                                    variant="h5"
                                                    style={{ marginLeft: 10 }}
                                                >
                                                    {`${'Tuần '}${item.week}`}
                                                </Typography>
                                                {item.data.map((item, index) => {
                                                    return <div
                                                            key={index}
                                                        >
                                                            <Divider
                                                                style={{ marginTop: 10 }}
                                                            />
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
                                                                        {`${'Ngày: '}`} 
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
                                                            <Grid
                                                                item
                                                                md={12}
                                                                xs={12}
                                                            >
                                                                <Box
                                                                    alignItems="center"
                                                                    display="flex"
                                                                    flexDirection="row"
                                                                    style={{ marginLeft: 15 }}
                                                                >
                                                                    <Typography
                                                                        color="textSecondary"
                                                                        variant="body2"
                                                                        style={{ marginLeft: 10 }}
                                                                    >
                                                                        {`${'Tổng số ly bán được: '}`} 
                                                                    </Typography>
                                                                    <Typography
                                                                        color="textSecondary"
                                                                        variant="body2"
                                                                        style={{ marginLeft: 5, fontWeight: '600'}}
                                                                    >
                                                                        {`${item.totalQuantity}`} 
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid
                                                                container
                                                                spacing={3}
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
                                                                        style={{ marginLeft: 15 }}
                                                                    >
                                                                        <Typography
                                                                            color="textSecondary"
                                                                            variant="body2"
                                                                            style={{ marginLeft: 10 }}
                                                                        >
                                                                            {`${'Tổng tiền: '}`}
                                                                        </Typography>
                                                                        <Typography
                                                                            color="textSecondary"
                                                                            variant="body2"
                                                                            style={{ marginLeft: 5, fontWeight: '600'}}
                                                                        >
                                                                            <CurrencyFormat value={item.totalMoney} displayType={'text'} thousandSeparator={true}/>
                                                                        </Typography>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                    </div>
                                                })}
                                            </div>
                                        })}
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    })}
                </div>
            })}
        </Card>
    );
};

IncomeListResults.propTypes = {
  className: PropTypes.string
};

export default IncomeListResults;
