import { useQuery } from 'react-query';
import APIClient from '../services/api-client';

export interface Character {
  id: number;
  image: string;
  name: string;
  location: {
    name: string;
  };
}

const useCharacters = (page: number) => {
  const apiClient = new APIClient(`/character/`);

  return useQuery({
    queryKey: ['characters', page],
    queryFn: () => apiClient.getAll({ params: { page } }),
    cacheTime: 0,
    staleTime: 24 * 60 * 60 * 1000, //24h
  });
};

export default useCharacters;
