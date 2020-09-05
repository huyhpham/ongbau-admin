import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import * as appActions from '../../../store/actions/app';
import Page from 'src/components/Page';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch(),
    [customers, setCustomers] = useState([]),
    customerList = useSelector(state => state.app.customerList);
  
  const onChangeCustomerList = value => {
    setCustomers(value);
  }

  useEffect(() => {
    dispatch(appActions.getCustomerList());
  }, []);

  useEffect(() => {
    if(customerList) {
      onChangeCustomerList(customerList);
    }
  }, [customerList]);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
