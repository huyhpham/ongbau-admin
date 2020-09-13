import React, { useState, useEffect }from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { groupBy, getWeekOfMonth } from '../../../utils/groupBy'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Sales = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme(),
    incomeList = useSelector(state => state.app.incomeList),
    [formatData, setFormatData] = useState([]),
    [label, setLabel] = useState([]),
    [weekArray, setWeekArray] = useState([]),
    [month, setMonth] = useState(''),
    [monthArray, setMonthArray] = useState([]),
    [money, setMoney] = useState([]);
  const [week, setWeek] = useState('');

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    const monthCheck  = moment().format('M');
    setMonth(monthCheck);
    const weekCheck = getWeekOfMonth(today);

    if(incomeList.length !== 0) {
      const tempArray = groupBy(incomeList);
      setFormatData(tempArray);
      tempArray.forEach((item) => {
        let monthArray = [];
        item.data.forEach((item) => {
          monthArray.push(item.month);
          setMonthArray(monthArray);
          if(item.month === monthCheck) {
            let weekArray = [];
            item.data.forEach(async (item) => {
              weekArray.push(item.week);
              setWeekArray(weekArray);
              if(item.week === weekCheck.toString()) {
                let tempLable = [];
                let tempMoneyData = [];
                item.data.forEach((item) => {
                  tempLable.push(item.date);
                  tempMoneyData.push(item.totalMoney);
                });
                setLabel(tempLable);
                setMoney(tempMoneyData);
              } else if (item.week === weekArray[weekArray.length -1]) {
                setWeek(weekArray[weekArray.length -1]);
                let tempLable = [];
                let tempMoneyData = [];
                item.data.forEach((item) => {
                  tempLable.push(item.date);
                  tempMoneyData.push(item.totalMoney);
                });
                setLabel(tempLable);
                setMoney(tempMoneyData);
              }
            });
          }
        });
      });
    }
  }, [incomeList]);

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: money,
        label: 'This week'
      },
      // {
      //   backgroundColor: colors.grey[200],
      //   data: [11, 20, 12, 29, 30, 25, 13],
      //   label: 'Last year'
      // }
    ],
    labels: label
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
            callback(value) {
              return Number(value).toLocaleString('en')
            }
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
      callbacks: {
        label: function(tooltipItem, data) {
          var value = data.datasets[0].data[tooltipItem.index];
          if(parseInt(value) >= 1000){
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          } else {
            return value;
          }
      }
      }
    }
  };

  const handleChange = async (event) => {
    await setWeek(event.target.value);
    await formatData.forEach((item) => {
      item.data.forEach((item) => {
        if(item.month === month) {
          item.data.forEach((item) => {
            if(item.week === event.target.value) {
              let tempLable = [];
              let tempMoneyData = [];
              item.data.forEach((item) => {
                tempLable.push(item.date);
                tempMoneyData.push(item.totalMoney);
              });
              setLabel(tempLable);
              setMoney(tempMoneyData);
            }
          });
        }
      });
    });
  };

  const handleMonthChange = (event) => {
    formatData.forEach((item) => {
      item.data.forEach((item) => {
        if(item.month === event.target.value) {
          let weekArray = [];
          item.data.forEach(async (item) => {
            weekArray.push(item.week);
            await setWeekArray(weekArray);
            await setWeek(weekArray[0]);
            if(item.week === weekArray[0]) {
              
              let tempLable = [];
              let tempMoneyData = [];
              item.data.forEach((item) => {
                tempLable.push(item.date);
                tempMoneyData.push(item.totalMoney);
              });
              setLabel(tempLable);
              setMoney(tempMoneyData);
            }
          });
        }
      });
    });
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={(
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <FormControl
              variant="filled"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-filled-label">Tháng</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={month}
                onChange={async (event) => {
                  await setMonth(event.target.value);
                  await handleMonthChange(event); 
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {monthArray.map((item, index) => {
                  return <MenuItem
                    value={item}
                    key={index}
                  >
                    {`${'Tháng '}${item}`}
                  </MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl
              variant="filled"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-filled-label">Tuần</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={week}
                onChange={(event) => {handleChange(event);}}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {weekArray.map((item, index) => {
                  return <MenuItem
                    value={item}
                    key={index}
                  >
                    {`${'Tuần '}${item}`}
                  </MenuItem>
                })}
              </Select>
            </FormControl>
          </Box>
          
        )}
        title={`${'Thu nhập tháng '}${month}`}
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string
};

export default Sales;
