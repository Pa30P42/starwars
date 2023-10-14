import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Character} from '../types';

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
  addToFavorites: (character: Character) => void;
  removeFromFavorites: (name: Character) => void;
  isFavorited: (name: string) => boolean;
  favoriteList: Character[];
  loading: boolean;
};

const useCharactersData = (
  fetchData: (page: number) => Promise<CharactersData>,
  initialPage = 1,
): CharactersHook => {
  const [data, setData] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [favoriteList, setFavoriteList] = useState<Character[]>([]);

  const goToPage = (targetPage: number) => {
    if (targetPage >= 1) {
      setPage(targetPage);
    }
  };

  const getNextPage = () => {
    if (nextPage) {
      const nextPageNumber = getPageNumberFromUrl(nextPage);
      goToPage(nextPageNumber);
    }
  };

  const getPrevPage = () => {
    if (prevPage) {
      const prevPageNumber = getPageNumberFromUrl(prevPage);
      goToPage(prevPageNumber);
    }
  };

  const getPageNumberFromUrl = (url: string) => {
    const match = url.match(/page=(\d+)/);
    if (match) {
      return parseInt(match[1], 10);
    }
    return 1;
  };

  const retrieveFavoriteList = async () => {
    try {
      const value = await AsyncStorage.getItem('@FavoriteCharacters');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        setFavoriteList(parsedValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorites = async (character: Character) => {
    const jsonValue = JSON.stringify([...favoriteList, character]);
    await AsyncStorage.setItem('@FavoriteCharacters', jsonValue);
    setFavoriteList(prev => {
      return [...prev, character];
    });
  };

  const removeFromFavorites = async (character: Character) => {
    const jsonValue = JSON.stringify(
      favoriteList.filter(char => char !== character),
    );
    await AsyncStorage.setItem('@FavoriteCharacters', jsonValue);

    setFavoriteList(prev => {
      return prev.filter(char => char.name !== character.name);
    });
  };

  const isFavorited = (name: string) => {
    const res = favoriteList.find(char => char.name === name);
    if (!res) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    retrieveFavoriteList();
  }, []);

  useEffect(() => {
    setLoading(true);
    const extractValues = async () => {
      try {
        const response = await fetchData(page);
        setData(response.results);
        setNextPage(response.next);
        setPrevPage(response.previous);
        setLoading(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('error', error);
        throw new Error(typeof error === 'string' ? error : "Can't get data");
      }
    };

    extractValues();
  }, [page, fetchData]);

  return {
    data,
    favoriteList,
    getNextPage,
    getPrevPage,
    removeFromFavorites,
    isFavorited,
    addToFavorites,
    loading,
  };
};

export default useCharactersData;
