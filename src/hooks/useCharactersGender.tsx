import {useEffect, useState} from 'react';
import {Character} from '../types';

type Gender = {
  male: number;
  female: number;
  other: number;
};

const useCharactersGender = (favorites: Character[]): Gender => {
  const [male, setMale] = useState<number>(0);
  const [female, setFemale] = useState<number>(0);
  const [other, setOther] = useState<number>(0);

  useEffect(() => {
    const counts = favorites.reduce(
      (acc, character) => {
        switch (character.gender.toLowerCase()) {
          case 'male':
            acc.maleCount++;
            break;
          case 'female':
            acc.femaleCount++;
            break;
          default:
            acc.otherCount++;
            break;
        }
        return acc;
      },
      {maleCount: 0, femaleCount: 0, otherCount: 0},
    );

    setMale(counts.maleCount);
    setFemale(counts.femaleCount);
    setOther(counts.otherCount);
  }, [favorites]);

  return {
    male,
    female,
    other,
  };
};

export default useCharactersGender;
