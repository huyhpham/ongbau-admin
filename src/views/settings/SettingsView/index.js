import React from 'react';
import {
  Box,
  Container,
  makeStyles,
  Grid
} from '@material-ui/core';
import Page from 'src/components/Page';
import Notifications from './Notifications';
import Password from './Password';
import Salary from './Salary';
import DrinkItem from './DrinkItem';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        {/* <Notifications /> */}
        <Box mt={3}>
          <Password />
        </Box>
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Salary />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <DrinkItem />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;
