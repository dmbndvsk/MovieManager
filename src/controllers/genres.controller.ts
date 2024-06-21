import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GenresService } from 'src/services/genres.service';
import { CreateGenreDto } from 'src/common/dto/create-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}

/*
  GenresController:
  - Provides endpoints to interact with genre-related operations.
  - @Get() findAll(): Returns all genres.
  - @Get(':id') findOne(id: string): Returns a genre by its ID.
  - @Post() create(createGenreDto: CreateGenreDto): Creates a new genre.
  - @Delete(':id') remove(id: string): Removes a genre by its ID.
*/
