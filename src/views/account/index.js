import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Paper,
  Box
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import Page from 'src/components/Page';
import Profile from './AccountView/Profile';
import ProfileDetails from './AccountView/ProfileDetails';
import SalaryDetails from './SalaryView/SalaryDetails';
import SalaryResults from './SalaryView/SalaryResult';
import ExpenseDetails from './ExpenseView/ExpenseDetails';
import ExpenseResults from './ExpenseView/ExpenseResult';
import IncomeDetails from './IncomeView/IncomeDetails';

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

const Account = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0),
    employeeSalaryList = useSelector(state => state.app.employeeSalaryList);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page
      className={classes.root}
      title="Patient"
    >
      <Container maxWidth={false}>
        <Paper 
            square
          >
            <Tabs
              value={value}
              onChange={handleChange}
            >
              <Tab label="Nhập nguyên liệu" {...a11yProps(0)} />
              <Tab label="Tính lương" {...a11yProps(1)} />
              <Tab label="Tính thu chi" {...a11yProps(2)} />
              <Tab label="Tính thu nhập hàng ngày" {...a11yProps(3)} />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <Grid
              container
              spacing={3}
              mt={3}
            >
              <Grid
                item
                lg={5}
                md={6}
                xs={12}
              >
                <Profile />
              </Grid>
              <Grid
                item
                lg={7}
                md={6}
                xs={12}
              >
                <ProfileDetails />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid
              container
              spacing={3}
              mt={3}
            >
              <Grid
                item
                lg={8}
                md={6}
                xs={12}
              >
                <SalaryResults customers={employeeSalaryList}/>
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                <SalaryDetails />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid
              container
              spacing={3}
              mt={3}
            >
              <Grid
                item
                lg={5}
                md={6}
                xs={12}
              >
                <ExpenseResults/>
              </Grid>
              <Grid
                item
                lg={7}
                md={6}
                xs={12}
              >
                <ExpenseDetails />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Grid
              container
              spacing={3}
              mt={3}
            >
              <Grid
                item
                lg={12}
                md={6}
                xs={12}
              >
                <IncomeDetails />
              </Grid>
            </Grid>
          </TabPanel>
      </Container>
    </Page>
  );
};

export default Account;
