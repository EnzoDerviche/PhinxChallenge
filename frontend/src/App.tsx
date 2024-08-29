import { useState, useEffect } from 'react';
import styles from './App.module.css'; 
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Pokemon from './components/Pokemon';
import BattleZone from './components/BattleZone';
import PokemonType from './interfaces';

interface SelectedPokemons {
  selected: PokemonType | null,
  random: PokemonType | null
}

function App() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<SelectedPokemons>({
    selected: null,
    random: null,
  });

  useEffect(() => {
    fetch('http://localhost:3000/pokemon')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: PokemonType[]) => {
        if (data && Array.isArray(data)) {
          setPokemons(data); 
          // console.error('Unexpected data format:', data);
        }
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  const getRandomPokemon = (id: string | null) => {
    const filteredPokemons = pokemons.filter(
      (pokemon:PokemonType) => pokemon.id !== id
    );

    const randomIndex = Math.floor(Math.random() * filteredPokemons.length);
    return filteredPokemons[randomIndex];
  };

  function handleSelectPokemon(pokemon:PokemonType) {
    const newRandomPokemon = getRandomPokemon(pokemon.id);
    setSelectedPokemons({
      selected:pokemon,
      random: newRandomPokemon,
  });

  }

  return (
    <div className={styles.content}>
      <div className={styles.titles}>
        <h1>Battle of Pokemons</h1>
        <h2>Select your pokemon</h2>
      </div>
      <div className={styles.allPokemons}>
        {pokemons.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {pokemons.map((pokemon) => (
              <li onClick={() => handleSelectPokemon(pokemon)} key={pokemon.id}>
                <Pokemon 
                name = {pokemon.name}
                imageUrl = {pokemon.imageUrl}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.battleZone}>
        <BattleZone pokemons={selectedPokemons}/>
      </div>
    </div>
  );
}

export default App;