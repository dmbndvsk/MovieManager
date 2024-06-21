import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from 'src/services/movies.service';
import { CreateMovieDto } from 'src/common/dto/create-movie.dto';
import { Movie } from 'src/common/entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    const skipValue = skip ? parseInt(skip, 10) : 0;
    const takeValue = take ? parseInt(take, 10) : 10;
    return this.moviesService.findAll(skipValue, takeValue);
  }

  @Get('search')
  search(
    @Query('title') title: string,
    @Query('genre') genre: string,
  ): Promise<Movie[]> {
    return this.moviesService.search(title, genre);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: CreateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}

/*
  MoviesController:
  - Provides endpoints to interact with movie-related operations.
  - @Get() findAll(skip?: string, take?: string): Returns all movies with pagination.
  - @Get('search') search(title: string, genre: string): Searches for movies by title or genre.
  - @Get(':id') findOne(id: string): Returns a movie by its ID.
  - @Post() create(createMovieDto: CreateMovieDto): Creates a new movie.
  - @Put(':id') update(id: string, updateMovieDto: CreateMovieDto): Updates an existing movie by its ID.
  - @Delete(':id') remove(id: string): Removes a movie by its ID.
*/
