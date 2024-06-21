import { IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  name: string;
}

/*
  CreateGenreDto: Data Transfer Object for creating a new Genre.
  - name: The name of the genre (must be a string).
*/
