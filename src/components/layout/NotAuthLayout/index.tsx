import React from 'react';
import useStyles from './styles';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const NotAuthLayout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default NotAuthLayout;
