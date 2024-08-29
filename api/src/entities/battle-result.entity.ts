import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class BattleResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonId1: string;

  @Column()
  pokemonId2: string;

  @Column()
  winner: string;

  @CreateDateColumn()
  battleDate: Date;
}
