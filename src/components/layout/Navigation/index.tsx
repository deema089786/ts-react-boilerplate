import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  Avatar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ExitToApp as ExitIcon,
  Apps as OrdersIcon,
} from '@material-ui/icons';

import { useAuth } from '../../../providers/auth';
import useStyles from './styles';

interface Props {
  open: boolean;
  setOpen: (ope: boolean) => void;
}
const Navigation: React.FC<Props> = (props: Props) => {
  const { open, setOpen } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles({});
  const { logout, user } = useAuth();

  return (
    <Drawer
      variant={matches ? undefined : 'permanent'}
      open={matches ? open : true}
      PaperProps={{ className: classes.drawerPaper }}
      className={classNames(
        classes.drawer,
        matches
          ? {}
          : {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          },
      )}
      classes={{
        paper: classNames(
          matches
            ? {}
            : {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            },
        ),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeftIcon color="secondary" />
        </IconButton>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.userContainer}>
        <Avatar>{get(user, 'firstName', '').charAt(0)}</Avatar>
        <div className={classNames(classes.userInfoContainer, { [classes.hide]: !open, [classes.show]: open })}>
          <Typography variant="h5">
            <Typography variant="subtitle1">
              {get(user, 'firstName')}
              &nbsp;
              {get(user, 'lastName')}
            </Typography>
          </Typography>
          <Typography variant="body1">{get(user, 'organization')}</Typography>
        </div>
      </div>
      <List
        onClick={() => {
          if (matches) {
            setOpen(false);
          }
        }}
      >
        <ListItem component={Link} to="/" button>
          <ListItemIcon>
            <OrdersIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider className={classes.divider} />
      <List>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitIcon color="secondary" />
          </ListItemIcon>
          <ListItemText>Exit</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Navigation;
