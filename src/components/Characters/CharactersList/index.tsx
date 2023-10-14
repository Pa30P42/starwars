import React from 'react';
import {ScrollView} from 'react-native';
import {Character} from '../../../types';
import CharactersListItem from './CharactersListItem';

interface Props {
  characters: Character[];
  isFavorited: (name: string) => boolean;
  addToFavorites: (character: Character) => void;
  removeFromFavorites: (character: Character) => void;
}

const CharactersList: React.FC<Props> = ({
  characters,
  isFavorited,
  addToFavorites,
  removeFromFavorites,
}) => {
  return (
    <ScrollView className="flex-1 py-5">
      {characters.map(char => (
        <CharactersListItem
          key={char.name}
          character={char}
          isFavorited={isFavorited}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
        />
      ))}
    </ScrollView>
  );
};

export default CharactersList;
