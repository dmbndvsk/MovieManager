import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}

/*
  Genre Entity:
  - id: Unique identifier for the genre, automatically generated as a UUID.
  - name: The name of the genre.
  - addId: A method that assigns a UUID to the id field before the entity is inserted into the database.
*/
