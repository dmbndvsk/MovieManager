import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Genre } from './genre.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  releaseDate: string;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}

/*
  Movie Entity:
  - id: Unique identifier for the movie, automatically generated as a UUID.
  - title: The title of the movie.
  - description: The description of the movie.
  - releaseDate: The release date of the movie.
  - genres: A many-to-many relationship with the Genre entity, with a join table to manage the relationship.
  - addId: A method that assigns a UUID to the id field before the entity is inserted into the database.
*/
