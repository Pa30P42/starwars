import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Character} from '../../../../types';
import HeartIcon from '../../../icons/Heart';
import HeartEmptyIcon from '../../../icons/HeartEmptyIcon';

interface Props {
  character: Character;
  isFavorited: (name: string) => boolean;
  addToFavorites: (character: Character) => void;
  removeFromFavorites: (character: Character) => void;
}

const CharactersListItem: React.FC<Props> = ({
  character,
  isFavorited,
  addToFavorites,
  removeFromFavorites,
}) => {
  const favorite = isFavorited(character.name);
  const onFavoritePress = () => {
    favorite ? removeFromFavorites(character) : addToFavorites(character);
  };
  return (
    <View className="bg-white shadow-md rounded-lg p-4 w-full mx-auto my-2 flex-row justify-between">
      <Text>{character.name}</Text>
      <View className="flex-row">
        <TouchableOpacity onPress={onFavoritePress}>
          {favorite ? <HeartIcon /> : <HeartEmptyIcon />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CharactersListItem;
