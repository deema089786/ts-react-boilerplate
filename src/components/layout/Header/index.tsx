import React from 'react';
import {
  AppBar, Toolbar, Typography,
} from '@material-ui/core';
import useStyles from './styles';


const Header: React.FC = () => {
  const classes = useStyles({});
  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          React Boilerplate
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
