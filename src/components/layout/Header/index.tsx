import React from 'react';
import classNames from 'classnames';
import {
  AppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import useStyles from './styles';

interface Props {
  open: boolean;
  setOpen: (ope: boolean) => void;
}
const Header: React.FC<Props> = (props: Props) => {
  const { open, setOpen } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: matches ? false : open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          edge="start"
          className={classNames(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          carcab
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
