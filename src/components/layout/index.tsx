import React, { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import useStyles from './styles';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const classes = useStyles();
  const [open, setOpenNative] = useState(localStorage.getItem('open') === 'true');
  const setOpen = (value: boolean) => {
    localStorage.setItem('open', value.toString());
    setOpenNative(value);
  };

  return (
    <div className={classes.root}>
      <Header open={open} setOpen={setOpen} />
      <Navigation open={open} setOpen={setOpen} />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
