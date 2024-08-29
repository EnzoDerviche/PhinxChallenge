import { Controller, Post, Get, Param, Query } from '@nestjs/common';
import * as fs from 'fs';
import { PokemonService } from './app.service';
import { Pokemon } from './entities/pokemon.entity';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post('import')
  async importData() {
    const data = JSON.parse(fs.readFileSync('pokemon.json', 'utf8'));
    await this.pokemonService.insertData(data.pokemon);
    return { message: 'Pokémon data imported successfully' };
  }

  @Get('battle')
  async battle(
    @Query('id1') id1: string,
    @Query('id2') id2: string,
  ): Promise<string> {
    return this.pokemonService.handleBattle(id1, id2);
  }

  @Get()
  async getAllPokemon(): Promise<Pokemon[]> {
    return await this.pokemonService.getAllPokemon();
  }

  @Get(':id')
  async getPokemonById(@Param('id') id: string): Promise<Pokemon> {
    return await this.pokemonService.getPokemonById(id);
  }
}
