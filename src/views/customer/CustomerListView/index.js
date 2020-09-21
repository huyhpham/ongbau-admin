import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Paper
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as appActions from '../../../store/actions/app';
import _ from 'lodash'; 
import { groups, groupBy } from '../../../utils/groupBy';

import Page from 'src/components/Page';
import Results from './Results';
import EmployeeResults from '../EmployeeListView/EmployeeResults';
import IncomeResults from '../IncomeListView/IncomeResults';
import SalaryResults from '../SalaryListView/SalaryResults';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CustomerListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch(),
    customerList = useSelector(state => state.app.customerList),
    employeeList = useSelector(state => state.app.employeeList);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const newArray = [];
    const tempArray = _.groupBy(customerList, groups['byMonth']);
    Object.keys(tempArray).map(i => newArray.push({
      month: i,
      data: tempArray[i]
    }));
  }, []);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Paper 
          square
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Nguyên vật liệu" {...a11yProps(0)} />
            <Tab label="Thu chi" {...a11yProps(1)} />
            <Tab label="Nhân viên" {...a11yProps(2)} />
            <Tab label="Thu nhập tháng" {...a11yProps(3)} />
            <Tab label="Tiền lương" {...a11yProps(4)} />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <Results customers={customerList} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EmployeeResults customers={employeeList}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <IncomeResults />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <SalaryResults />
        </TabPanel>
      </Container>
    </Page>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default CustomerListView;
