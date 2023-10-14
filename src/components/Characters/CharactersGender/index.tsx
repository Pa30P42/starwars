import React from 'react';
import {Text, View} from 'react-native';
import {Character} from '../../../types';
import useCharactersGender from '../../../hooks/useCharactersGender';

interface Props {
  favoriteList: Character[];
}

const CharactersGender: React.FC<Props> = ({favoriteList}) => {
  const {male, female, other} = useCharactersGender(favoriteList);
  return (
    <View className="flex-row justify-between">
      <View className="items-center">
        <Text className="text-3xl mb-4">{male}</Text>
        <Text className="text-2xl">Male</Text>
      </View>
      <View className="items-center">
        <Text className="text-3xl mb-4">{female}</Text>
        <Text className="text-2xl">Female</Text>
      </View>
      <View className="items-center">
        <Text className="text-3xl mb-4">{other}</Text>
        <Text className="text-2xl">Other</Text>
      </View>
    </View>
  );
};

export default CharactersGender;
