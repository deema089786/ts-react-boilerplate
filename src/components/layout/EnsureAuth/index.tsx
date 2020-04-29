import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../providers/auth';

interface Props {
  children: JSX.Element | JSX.Element[];
}
const EnsureAuth: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { isAuth } = useAuth();
  const history = useHistory();
  if (!isAuth) {
    history.push('/sign-in');
    return null;
  }
  return <>{children}</>;
};

export default EnsureAuth;
