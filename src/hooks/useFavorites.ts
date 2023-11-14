import {useEffect, useState} from 'react';
import {Character} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Favorite = {
  addToFavorites: (character: Character) => void;
  removeFromFavorites: (name: Character) => void;
  isFavorited: (name: string) => boolean;
  favoriteList: Character[];
};

const useFavorites = (): Favorite => {
  const [favoriteList, setFavoriteList] = useState<Character[]>([]);

  const retrieveFavoriteList = async () => {
    try {
      const value = await AsyncStorage.getItem('@FavoriteCharacters');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        setFavoriteList(parsedValue);
      }
    } catch (error: any) {
      throw new Error(error);
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

  return {
    addToFavorites,
    removeFromFavorites,
    isFavorited,
    favoriteList,
  };
};

export default useFavorites;
