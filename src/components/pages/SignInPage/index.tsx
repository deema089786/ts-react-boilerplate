import React from 'react';
import {
  Button,
  Container,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Grid,
  Link as MUILink,
  Box,
  Checkbox,
} from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from '../../../providers/auth';
import NotAuthLayout from '../../layout/NotAuthLayout';
import signInValidation from './validation';
import useStyles from './styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MUILink component={Link} color="inherit" to="/">
        TS React Boilerplate
      </MUILink>
      &nbsp;
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const SignInPage: React.FC = () => {
  const classes = useStyles();
  const { signIn } = useAuth();
  const {
    values, handleChange, handleSubmit, isSubmitting, submitCount, errors,
  } = useFormik<{
    email: string;
    password: string;
  }>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInValidation,
    onSubmit: (inputValues) => signIn(inputValues),
  });

  return (
    <NotAuthLayout>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              value={values.email}
              onChange={handleChange}
              error={errors.email !== undefined && submitCount > 0}
              helperText={errors.email !== undefined && submitCount > 0 ? errors.email : undefined}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={errors.password !== undefined && submitCount > 0}
              value={values.password}
              onChange={handleChange}
              helperText={errors.password !== undefined && submitCount > 0 ? errors.password : undefined}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Your password"
              type="password"
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Stay logged in" />
            <Button
              disabled={isSubmitting || (Object.keys(errors).length > 0 && submitCount > 0)}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <MUILink component={Link} to="/" variant="body2">
                  Forgot password?
                </MUILink>
              </Grid>
              <Grid item>
                <MUILink component={Link} to="/sign-up" variant="body2">
                  Still no Account? Sign UP
                </MUILink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </NotAuthLayout>
  );
};
export default SignInPage;
