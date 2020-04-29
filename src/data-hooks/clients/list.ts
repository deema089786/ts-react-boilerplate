import { useState, useEffect } from 'react';
import * as api from '../../services/api';
import { API } from '../../types';

export interface UseClientHook {
  clients: API.Client[];
  loading: boolean;
  handleRemove(id: string, onSuccess?: () => void): Promise<void>;
}

const useClients = (): UseClientHook => {
  const [clients, setClients] = useState<API.Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const exec = async () => {
      try {
        setLoading(true);
        const { data } = await api.clients.list();
        setClients(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    exec().catch(e => console.error(e));
  }, []);
  return {
    clients,
    loading,
    handleRemove: async (id, onSuccess) => {
      try {
        setLoading(true);
        await api.clients.remove({ id });
        const { data } = await api.clients.list();
        setClients(data);
        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
  };
};

export default useClients;
