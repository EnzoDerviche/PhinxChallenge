import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { BattleResult } from './entities/battle-result.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(BattleResult)
    private readonly battleResultRepository: Repository<BattleResult>,
  ) {}

  async insertData(pokemonData: Pokemon[]): Promise<Pokemon[]> {
    return await this.pokemonRepository.save(pokemonData);
  }

  async getAllPokemon(): Promise<Pokemon[]> {
    return await this.pokemonRepository.find();
  }

  async getPokemonById(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOneBy({ id });
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id ${id} not found`);
    }
    return pokemon;
  }

  calculateDamage(attacker: Pokemon, defender: Pokemon): number {
    const damage = attacker.attack - defender.defense;
    return damage > 0 ? damage : 1; // El daño mínimo es 1
  }

  determineTurnOrder(pokemon1: Pokemon, pokemon2: Pokemon): [Pokemon, Pokemon] {
    if (pokemon1.speed > pokemon2.speed) {
      return [pokemon1, pokemon2];
    } else if (pokemon2.speed > pokemon1.speed) {
      return [pokemon2, pokemon1];
    } else {
      return pokemon1.attack >= pokemon2.attack
        ? [pokemon1, pokemon2]
        : [pokemon2, pokemon1];
    }
  }

  simulateBattle(pokemon1: Pokemon, pokemon2: Pokemon): string {
    const [firstAttacker, secondAttacker] = this.determineTurnOrder(
      pokemon1,
      pokemon2,
    );

    let hp1 = pokemon1.hp;
    let hp2 = pokemon2.hp;

    while (hp1 > 0 && hp2 > 0) {
      hp2 -= this.calculateDamage(firstAttacker, secondAttacker);
      if (hp2 <= 0) return firstAttacker.name; // Segundo atacante pierde

      hp1 -= this.calculateDamage(secondAttacker, firstAttacker);
      if (hp1 <= 0) return secondAttacker.name; // Primer atacante pierde
    }

    return 'Draw'; // Solo llega aquí si hay un empate, lo cual no debería ocurrir con la lógica actual
  }

  async recordBattleResult(
    pokemonId1: string,
    pokemonId2: string,
    winner: string,
  ): Promise<void> {
    const battleResult = this.battleResultRepository.create({
      pokemonId1,
      pokemonId2,
      winner,
    });
    await this.battleResultRepository.save(battleResult);
  }

  async handleBattle(pokemonId1: string, pokemonId2: string): Promise<string> {
    const pokemon1 = await this.getPokemonById(pokemonId1);
    const pokemon2 = await this.getPokemonById(pokemonId2);

    const winner = this.simulateBattle(pokemon1, pokemon2);
    await this.recordBattleResult(pokemonId1, pokemonId2, winner);

    return winner;
  }
}
