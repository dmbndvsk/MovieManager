# Movie Manager

This is a Movie Manager application built with NestJS, TypeORM, and PostgreSQL. The application provides functionalities to manage movies and genres, including creating, reading, updating, and deleting movies and genres. It also supports searching for movies by title and genre, as well as pagination for the movie list.

## Table of Contents

- [Movie Manager](#movie-manager)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
    - [Movies](#movies)
    - [Genres](#genres)
  - [Data Validation](#data-validation)
    - [CreateMovieDto](#createmoviedto)
    - [CreateGenreDto](#creategenredto)
  - [Pagination](#pagination)
  - [Middleware](#middleware)
  - [Error Handling](#error-handling)
## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dmbndvsk/MovieManager.git
   cd movie-manager
   ```
2. **Install the dependencies:**

   ```
   npm install
   ```
3. **Set up the PostgreSQL database:**

Ensure you have PostgreSQL installed and running. Create a database for the application.

4. **Configure environment variables:**

Create a `.env` file in the root directory and add the following variables:

```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_db_user
   DATABASE_PASSWORD=your_db_password
   DATABASE_NAME=your_db_name
```

## Running the Application

1. **Start the PostgreSQL service:**

   ```
   brew services start postgresql@14
   ```
2. **Run the application:**

   ```
   npm run start
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Movies

- **Get all movies:**
  GET /movies
- **Search movies:**
  GET /movies/search?title=title&genre=genre
- **Get a single movie by ID:**
  GET /movies/:id
- **Create a new movie:**
  POST /movies

**Request Body:**

```json
{
  "title": "Movie Title",
  "description": "Movie Description",
  "releaseDate": "2024-06-20",
  "genres": ["Genre1", "Genre2"]
}
```

- **Update a movie by ID:**
  PUT /movies/:id
- **Delete a movie by ID::**
  DELETE /movies/:id

### Genres

- **Get all genres:**
  GET /genres
- **Get a single genre by ID:**
  GET /genres/:id
- **Create a new genre::**
  POST /genres

**Request Body:**

```
{
  "name": "Genre Name"
}
```

- **Delete a genre by ID:**
  DELETE /genres/:id

## Data Validation

The application uses class-validator for validating the data. The validation rules are defined in the DTO (Data Transfer Object) classes.

### CreateMovieDto

- `title`: The title of the movie (must be a string and cannot be empty).
- `description`: The description of the movie (must be a string and cannot be empty).
- `releaseDate`: The release date of the movie (must be a string and cannot be empty).
- `genres`: An array of genres (must be an array of strings and cannot be empty).

### CreateGenreDto

- `name`: The name of the genre (must be a string).

## Pagination

The application supports pagination for the list of movies. You can use the following query parameters to control pagination:

- `skip`: Number of records to skip (optional, default is 0).
- `take`: Number of records to take (optional, default is 10).

Example request to get the first page of movies with 10 movies per page:

```http
GET /movies?skip=0&take=10
```

## Middleware

The application includes a logger middleware that logs each incoming request along with its method, URL, status code, and response time.

## Error Handling

NestJS automatically handles validation errors and returns appropriate error messages. Custom error handling can be added using exception filters if needed.
