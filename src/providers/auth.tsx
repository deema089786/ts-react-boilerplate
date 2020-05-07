import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';

import * as api from '../services/api';
import { setOnForbidden, setOnUnauthorized } from '../services/api/fetch';
import WebSocketClient from '../services/ws';
import { API } from '../types';

let initUserData: API.UserProfile = null;
let initIsAuth = false;

try {
  const savedJSON = localStorage.getItem('auth');
  const parsedJSON = JSON.parse(savedJSON);
  initUserData = {
    id: get(parsedJSON, 'user.id'),
    firstName: get(parsedJSON, 'user.firstName'),
    lastName: get(parsedJSON, 'user.lastName'),
    email: get(parsedJSON, 'user.email'),
  };
  initIsAuth = get(parsedJSON, 'isAuth', false);
} catch (e) {
  console.error(e);
  initUserData = null;
}

const syncUserContext = (data: { user: API.UserProfile; isAuth: boolean }) => {
  localStorage.setItem('auth', JSON.stringify(data));
  if (data.isAuth === false) {
    localStorage.removeItem('token');
  }
};

export interface Auth {
  isAuth: boolean;
  user: API.UserProfile;
  logout: () => void;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signUp: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
}

const initialState: Auth = {
  isAuth: initIsAuth,
  user: initUserData,
  logout: () => {
    throw new Error('Not implemented!');
  },
  signIn: async () => {
    throw new Error('Not implemented!');
  },
  signUp: async () => {
    throw new Error('Not implemented!');
  },
};


export const AuthContext = React.createContext(initialState);
export const useAuth = () => useContext(AuthContext);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState<boolean>(initialState.isAuth);
  const [user, setUser] = useState<API.UserProfile>(initialState.user);
  const history = useHistory();

  const logout = () => {
    setIsAuth(false);
    setUser(null);
    syncUserContext({ user: null, isAuth: false });
  };
  const signIn: Auth['signIn'] = async (data) => {
    try {
      const {
        data: { token },
      } = await api.auth.login({ username: data.email, password: data.password });
      localStorage.setItem('token', token);
      const { data: userProfile } = await api.auth.profile();
      setIsAuth(true);
      setUser(userProfile);
      syncUserContext({ user: userProfile, isAuth: true });
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  };
  const signUp: Auth['signUp'] = async (data) => {
    try {
      const {
        data: { token },
      } = await api.auth.register(data);
      localStorage.setItem('token', token);
      const { data: userProfile } = await api.auth.profile();
      setIsAuth(true);
      setUser(userProfile);
      syncUserContext({ user: userProfile, isAuth: true });
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const exec = async () => {
      try {
        const { data: userProfile } = await api.auth.profile();
        syncUserContext({ user: userProfile, isAuth: true });
      } catch (e) {
        console.error(e);
      }
    };
    exec().catch((e) => console.error(e));
    setOnUnauthorized(logout);
    setOnForbidden(logout);
    WebSocketClient.connect();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        logout,
        signIn,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
