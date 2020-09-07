import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Paper,
  Box
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './AccountView/Profile';
import ProfileDetails from './AccountView/ProfileDetails';
import SalaryDetails from './SalaryView/SalaryDetails';

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
  const [value, setValue] = React.useState(0);

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
                {/* <ProfileDetails /> */}
                <SalaryDetails />
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
                {/* <SalaryDetails /> */}
                <ProfileDetails />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
      </Container>
    </Page>
  );
};

export default Account;
