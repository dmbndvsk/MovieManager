import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from 'src/controllers/movies.controller';
import { MoviesService } from 'src/services/movies.service';
import { Movie } from 'src/common/entities/movie.entity';
import { GenresController } from 'src/controllers/genres.controller';
import { GenresService } from 'src/services/genres.service';
import { Genre } from 'src/common/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  controllers: [MoviesController, GenresController],
  providers: [MoviesService, GenresService],
})
export class MoviesModule {}

/*
  MoviesModule:
  - Imports TypeOrmModule to use the Movie and Genre entities with TypeORM.
  - Registers MoviesController and GenresController to handle HTTP requests.
  - Registers MoviesService and GenresService to provide the business logic for movie and genre operations.
*/
