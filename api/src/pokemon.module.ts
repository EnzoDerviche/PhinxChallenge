import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { BattleResult } from './entities/battle-result.entity';
import { PokemonService } from './app.service';
import { PokemonController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, BattleResult])],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
