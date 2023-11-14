import {useState, useEffect} from 'react';
import {Character} from '../types';
import usePagination from './usePagination';

type CharactersData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};

type CharactersHook = {
  data: Character[];
  getNextPage: () => void;
  getPrevPage: () => void;
  loading: boolean;
};

const useCharactersData = (
  fetchData: (page: number) => Promise<CharactersData>,
): CharactersHook => {
  const {page, setNextPage, setPrevPage, getNextPage, getPrevPage} =
    usePagination();
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const extractValues = async () => {
      try {
        const response = await fetchData(page);
        setData(response.results);
        setNextPage(response.next);
        setPrevPage(response.previous);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error(typeof error === 'string' ? error : "Can't get data");
      }
    };

    extractValues();
  }, [page, fetchData, setNextPage, setPrevPage]);

  return {
    data,
    getNextPage,
    getPrevPage,
    loading,
  };
};

export default useCharactersData;
