import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import Layout from '../../layout';

const MainPage: React.FC = () => (
  <Layout>
    <Typography>Main Page (Authorized only)</Typography>
    <NavLink to="/sign-in">
      <Button>Sign in</Button>
    </NavLink>
  </Layout>
);
export default MainPage;
