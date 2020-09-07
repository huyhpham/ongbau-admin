import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import * as appActions from '../../../store/actions/app';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles(),
    dispatch = useDispatch();
  const newItem = useSelector(state => state.app.newItem);
  useEffect(() => {
    dispatch(appActions.getNewItem({}));
  }, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
        >
          <Box
            display="flex"
            flexDirection="column"
          >
            <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
            >
              Ngày kiểm kho:  
            </Typography>
            <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
            >
              {`Nguyên liệu:`+' '}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Tồn kho:
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Nhập kho:
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Xuất kho:
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Đã sử dụng:
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            ml={2}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h4"
            >
              {moment(newItem.date).format('dddd, DD MMMM, YYYY')}
            </Typography>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h4"
            >
              {Object.keys(newItem).length === 0 ? 'No item to show.' : newItem.itemName}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {Object.keys(newItem).length === 0 ? '0' : newItem.total}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {Object.keys(newItem).length === 0 ? '0' : newItem.importData}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {Object.keys(newItem).length === 0 ? '0' : newItem.exportData}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {Object.keys(newItem).length === 0 ? '0' : newItem.usedData}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      {/* <Divider /> */}
      {/* <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
