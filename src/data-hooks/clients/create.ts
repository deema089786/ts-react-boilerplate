import { useState } from 'react';
import * as api from '../../services/api';
import { API } from '../../types';

export interface Client {
  firstName: string;
  lastName?: string;
}

export interface UseCreateClientHook {
  createClient(user: Client): void;
  client: Client;
  loading: boolean;
}

const useClientCreate = (onCrated?: () => void): UseCreateClientHook => {
  const [client, setClient] = useState<API.Client>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const createClient: UseCreateClientHook['createClient'] = async (payload) => {
    try {
      const { data } = await api.clients.create(payload);
      setClient(data);
      if (typeof onCrated === 'function') {
        onCrated();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return { client, loading, createClient };
};

export default useClientCreate;
