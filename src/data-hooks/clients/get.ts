import { useState, useEffect } from 'react';
import * as api from '../../services/api';
import { API } from '../../types';

export interface Client {
  firstName: string;
  lastName?: string;
  phone: string;
  description?: string;
}

export interface UseClientHook {
  client: API.Client;
  loading: boolean;
  handleRemove(onSuccess?: () => void): Promise<void>;
  handleUpdate(payload: Client, cb?: () => void): Promise<void>;
}

const useClients = (id?: string): UseClientHook => {
  const [client, setClient] = useState<API.Client>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const exec = async () => {
      try {
        if (id === undefined) return;
        setLoading(true);
        const { data } = await api.clients.get(id);
        setClient(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    exec().catch(e => console.error(e));
  }, [id]);

  const handleUpdate: UseClientHook['handleUpdate'] = async (payload, cb) => {
    try {
      const { data } = await api.clients.update(id, payload);
      setClient(data);
      if (typeof cb === 'function') {
        cb();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    client,
    loading,
    handleRemove: async onSuccess => {
      try {
        setLoading(true);
        await api.clients.remove({ id });
        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    handleUpdate,
  };
};

export default useClients;
