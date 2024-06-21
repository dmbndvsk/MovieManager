import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from 'src/common/entities/genre.entity';
import { CreateGenreDto } from 'src/common/dto/create-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  findAll(): Promise<Genre[]> {
    return this.genresRepository.find();
  }

  async findOne(id: string): Promise<Genre> {
    return this.genresRepository.findOne({
      where: { id },
    });
  }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = new Genre();
    genre.name = createGenreDto.name;
    return this.genresRepository.save(genre);
  }

  async remove(id: string): Promise<void> {
    await this.genresRepository.delete(id);
  }
}

/*
  GenresService:
  - Provides methods to interact with the genre-related operations in the database.
  - findAll(): Retrieves all genres from the database.
  - findOne(id: string): Retrieves a single genre by its ID.
  - create(createGenreDto: CreateGenreDto): Creates a new genre in the database.
  - remove(id: string): Deletes a genre from the database by its ID.
*/
