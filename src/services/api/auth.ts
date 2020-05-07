import fetch from './fetch';
import { API } from '../../types';

const profile = () => fetch<API.UserProfile>('/auth/profile');

const login = (data: { username: string; password: string }) => fetch<{ token: string }>('/auth/login', { data, method: 'POST' });

const register = (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => fetch<{ token: string }>('/auth/register', { data, method: 'POST' });

export default { profile, login, register };
