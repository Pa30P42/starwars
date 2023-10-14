import React, {useMemo} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import CharactersGender from './CharactersGender';
import useCharactersData from '../../hooks/useCharacersData';
import {getProducts} from '../../services/api';
import CharactersList from './CharactersList';
import RightIcon from '../icons/RightIcons';
import LeftIcon from '../icons/LeftIcon';

const Characters = () => {
  const {
    data,
    getNextPage,
    getPrevPage,
    addToFavorites,
    removeFromFavorites,
    isFavorited,
    loading,
    favoriteList,
  } = useCharactersData(getProducts);

  const memoizedCharactersList = useMemo(
    () => (
      <CharactersList
        characters={data}
        isFavorited={isFavorited}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
      />
    ),
    [data, isFavorited, addToFavorites, removeFromFavorites],
  );

  return (
    <View className="flex-1">
      <CharactersGender favoriteList={favoriteList} />
      {!loading && data.length ? (
        memoizedCharactersList
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      )}
      <View className="flex-row justify-center">
        <TouchableOpacity onPress={getPrevPage}>
          <LeftIcon width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={getNextPage}>
          <RightIcon width={32} height={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Characters;
