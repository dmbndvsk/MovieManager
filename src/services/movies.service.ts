import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from 'src/common/entities/movie.entity';
import { CreateMovieDto } from 'src/common/dto/create-movie.dto';
import { Genre } from 'src/common/entities/genre.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  findAll(skip = 0, take = 10): Promise<Movie[]> {
    return this.moviesRepository.find({
      relations: ['genres'],
      skip,
      take,
    });
  }

  async findOne(id: string): Promise<Movie> {
    return this.moviesRepository.findOne({
      where: { id },
      relations: ['genres'],
    });
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, description, releaseDate, genres } = createMovieDto;

    const movie = new Movie();
    movie.title = title;
    movie.description = description;
    movie.releaseDate = releaseDate;

    if (genres && genres.length > 0) {
      const genreEntities = await this.genresRepository.find({
        where: genres.map((name) => ({ name })),
      });
      movie.genres = genreEntities;
    }

    return this.moviesRepository.save(movie);
  }

  async update(id: string, updateMovieDto: CreateMovieDto): Promise<void> {
    const { title, description, releaseDate, genres } = updateMovieDto;

    const movie = await this.findOne(id);
    movie.title = title;
    movie.description = description;
    movie.releaseDate = releaseDate;

    if (genres && genres.length > 0) {
      const genreEntities = await this.genresRepository.find({
        where: genres.map((name) => ({ name })),
      });
      movie.genres = genreEntities;
    }

    await this.moviesRepository.save(movie);
  }

  async remove(id: string): Promise<void> {
    await this.moviesRepository.delete(id);
  }

  async search(title: string, genre: string): Promise<Movie[]> {
    const queryBuilder = this.moviesRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.genres', 'genre');

    if (title) {
      queryBuilder.andWhere('movie.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    if (genre) {
      queryBuilder.andWhere('genre.name ILIKE :genre', { genre: `%${genre}%` });
    }

    return queryBuilder.getMany();
  }
}

/*
  MoviesService:
  - Provides methods to interact with the movie-related operations in the database.
  - findAll(skip: number, take: number): Retrieves all movies with pagination.
  - findOne(id: string): Retrieves a single movie by its ID.
  - create(createMovieDto: CreateMovieDto): Creates a new movie in the database.
  - update(id: string, updateMovieDto: CreateMovieDto): Updates an existing movie in the database.
  - remove(id: string): Deletes a movie from the database by its ID.
  - search(title: string, genre: string): Searches for movies by title and genre.
*/
