import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './pokemon.module';
import { AppDataSource } from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), PokemonModule],
})
export class AppModule {}
