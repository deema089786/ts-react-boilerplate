import fetch from './fetch';
import { API } from '../../types';

const list = () => fetch<API.Client[]>('/clients');

const remove = ({ id }: { id: string }) => fetch<{ status: boolean }>(`/clients/${id}`, { method: 'DELETE' });

const get = (id: string) => fetch<API.Client>(`/clients/${id}`);

const create = (data: { firstName: string; lastName?: string }) => fetch<API.Client>('/clients', { data, method: 'POST' });

const update = (
  clientId: string,
  data: { firstName: string; lastName?: string; phone: string; description?: string },
) => fetch<API.Client>(`/clients/${clientId}`, { data, method: 'PATCH' });

export default {
  list, create, get, remove, update,
};
