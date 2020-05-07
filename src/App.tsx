import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import { AuthProvider } from './providers/auth';

import MainPageContainer from './containers/MainPageContainer';
import SignInPageContainer from './containers/SignInPageContainer';

import EnsureAuth from './components/layout/EnsureAuth';
import theme from './theme';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/" exact>
              <MainPageContainer />
            </Route>
            <Route path="/protected" exact>
              <EnsureAuth>
                <MainPageContainer />
              </EnsureAuth>
            </Route>
            <Route path="/sign-in" exact>
              <SignInPageContainer />
            </Route>
          </Switch>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
