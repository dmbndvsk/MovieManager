import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  genres: string[];
}

/*
  CreateMovieDto: Data Transfer Object for creating a new Movie.
  - title: The title of the movie (must be a string and cannot be empty).
  - description: The description of the movie (must be a string and cannot be empty).
  - releaseDate: The release date of the movie (must be a string and cannot be empty).
  - genres: An array of genre IDs (must be an array of strings and cannot be empty).
*/
