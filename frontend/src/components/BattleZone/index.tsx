import { useState } from 'react';
import Button from '@mui/material/Button';
import styles from './battle-zone.module.css'; 
import AlertWinner from '../AlertWinner';
import CardInfo from '../CardInfo';
import PokemonType from '../../interfaces';

interface BattleZoneProps {
  pokemons: {
    selected: PokemonType | null;
    random: PokemonType | null;
  };
}

function BattleZone({ pokemons }: BattleZoneProps) {
  const [winner, setWinner] = useState<string | null>(null);

  const handleStartBattle = async () => {
    if (pokemons.selected && pokemons.random) {
      try {
        const response = await fetch(`http://localhost:3000/pokemon/battle?id1=${pokemons.selected.id}&id2=${pokemons.random.id}`);
        const result = await response.text(); // Suponiendo que el backend retorna solo el nombre del ganador
        setWinner(result);
      } catch (error) {
        console.error('Error during battle:', error);
      }
    } else {
      console.warn('Both Pokémon must be selected to start a battle.');
    }
  };

  return (
    <>
      <div>
        {winner === null ? (
          <div className={styles.winner}></div>
        ) : (
          <div className={styles.winner}>
            <AlertWinner winner={winner} />
          </div>
        )}
      </div>
      <div className={styles.contentBattle}>
          <CardInfo pokemon={pokemons.selected} />
        <div className={styles.button}>
          <Button disabled={pokemons.selected === null ? true : false} variant="contained" color="success" onClick={handleStartBattle}>
            START BATTLE
          </Button>
        </div>
          <CardInfo pokemon={pokemons.random} />
      </div>
    </>
  );
}

export default BattleZone;