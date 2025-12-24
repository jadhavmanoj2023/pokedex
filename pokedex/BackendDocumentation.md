# Pokédex Backend

## Overview

The Pokédex Backend is a Spring Boot–based RESTful API that integrates with the public **PokeAPI** to provide Pokémon-related data.  
It is designed using clean architecture principles with proper validation, centralized error handling, caching, and pagination to ensure scalability, performance, and reliability.

This backend supports:
- Fetching Pokémon details by **name or numeric ID**
- Retrieving a **paginated list** of Pokémon
- Efficient **in-memory caching** using Caffeine
- Graceful handling of invalid inputs and external API failures

---

## Tech Stack

- Java 17+
- Spring Boot
- Spring Web (REST APIs)
- Spring Cache
- Caffeine Cache
- Lombok
- RestTemplate
- PokeAPI (external service)

---

## Architecture

The application follows a layered architecture:

```

Controller Layer  →  Service Layer  →  Client Layer  →  External API (PokeAPI)
                          ↓
                       Validation
                          ↓
                       Caching

```

### Layer Responsibilities

- **Controller Layer**
  - Exposes REST endpoints
  - Handles HTTP requests and responses
  - Delegates logic to the service layer

- **Service Layer**
  - Contains business logic
  - Validates and normalizes inputs
  - Applies caching
  - Aggregates Pokémon and species data

- **Client Layer**
  - Communicates with the external PokeAPI
  - Converts HTTP errors into application-specific exceptions

- **Utility Layer**
  - Handles input validation and normalization

- **Configuration Layer**
  - Cache configuration
  - CORS configuration
  - RestTemplate configuration

- **Exception Handling Layer**
  - Centralized exception handling using `@RestControllerAdvice`

---

## API Endpoints

### Get Pokémon by Name or ID

```
GET /api/v1/pokemon/{nameOrId}
```

**Description**  
Fetches detailed Pokémon information using either:
- Pokémon name (case-insensitive)
- Pokémon numeric ID

**Examples**
```
/api/v1/pokemon/pikachu
/api/v1/pokemon/Pikachu
/api/v1/pokemon/25
```

**Response Includes**
- Pokémon ID
- Name
- Types
- Abilities
- Stats (attack, defense, hp, speed, etc.)
- Official artwork image
- Height and weight
- English description
---

### Get Paginated Pokémon List

```
GET /api/v1/pokemon/list?offset=0&limit=20
```

**Query Parameters**
- `offset` (default: 0) – Starting index
- `limit` (default: 20) – Number of records per page

**Response Includes**
- Total Pokémon count
- Offset and limit
- `hasMore` flag
- Next and previous pagination links
- List of Pokémon (ID, name, image)
---

### Cache Statistics

```
GET /api/v1/admin/cache/stats
````

**Description**  
Returns runtime cache statistics such as hit count, miss count, and eviction count.  
Useful for monitoring cache behavior during development and testing.
---

## Validation and Edge Case Handling

Validation is centralized using `PokemonValidator`.

### Supported Inputs
- Pokémon name (case-insensitive)
- Pokémon numeric ID

### Validation Rules
- Input must not be `null`
- Input must not be empty or blank
- Names may contain only alphabetic characters and hyphens
- IDs must be numeric

### Normalization
- Leading and trailing spaces are trimmed
- Pokémon names are converted to lowercase
- Numeric IDs are preserved

Invalid inputs return a **400 Bad Request** response.

---

## Error Handling

The backend uses centralized error handling via `GlobalExceptionHandler`.

### Custom Exceptions
- `BadRequestException`
- `PokemonNotFoundException`
- `ExternalServiceException`

### Error Response Format

```json
{
  "status": 404,
  "error": "NOT_FOUND",
  "message": "Pokemon not found: bfggfd",
  "timestamp": "2025-12-24T11:21:22",
  "path": "/api/v1/pokemon/bfggfd"
}
````

### HTTP Status Mapping

| Scenario             | Status Code               |
| -------------------- | ------------------------- |
| Invalid input        | 400 Bad Request           |
| Pokémon not found    | 404 Not Found             |
| External API failure | 503 Service Unavailable   |
| Unexpected error     | 500 Internal Server Error |

---

## External API Integration

The backend integrates with **PokeAPI** using `RestTemplate`.

### APIs Used

* Pokémon details API
* Pokémon species API
* Pokémon list API

The client layer is responsible for:

* Making external HTTP calls
* Handling HTTP client/server errors
* Translating external failures into domain-specific exceptions

---

## Caching

Caching is implemented using **Caffeine Cache**.

### Cached Data

* Individual Pokémon details
* Paginated Pokémon lists

### Cache Configuration

* Expiration: 30 minutes
* Maximum size: 200 entries
* Statistics enabled

### Benefits

* Reduced external API calls
* Faster response times
* Improved scalability

Caching is applied at the service layer to ensure validated and normalized inputs are cached consistently.

---

## Pagination

Pagination is implemented for Pokémon listing.

### Features

* Offset-based pagination
* `hasMore` indicator
* Next and previous links
* Frontend-friendly response format

---

## CORS Configuration

CORS is configured to allow requests from:

* Local development frontend
* Deployed frontend application

Allowed:

* HTTP methods: GET, POST, PUT, DELETE, OPTIONS
* All headers
* Credentials enabled

---

## How to Run the Backend

### Prerequisites

* Java 17+ installed
* Maven installed
* Internet connection (for PokeAPI)

### Steps

1. Clone the repository:

```bash
git clone <your-github-repo-url>
cd pokedex-backend
```

2. Build the project:

```bash
mvn clean install
```

3. Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Or build a jar and run:

```bash
mvn package
java -jar target/pokedex-0.0.1-SNAPSHOT.jar
```

4. Access the APIs:

* Get Pokémon by name or ID: `http://localhost:8080/api/v1/pokemon/{nameOrId}`
* Get paginated Pokémon list: `http://localhost:8080/api/v1/pokemon/list?offset=0&limit=20`
* Cache statistics: `http://localhost:8080/api/v1/admin/cache/stats`

### Notes

* Backend caches repeated API responses for 30 minutes.
* Invalid input will return standardized error responses.
* RESTful API guidelines are followed for all endpoints.

---

## Logging

* Service-level logs track external API calls
* Debug-level logging minimizes noise during cache hits
* Helps with debugging and performance analysis

---

## Sample API Requests and Responses

### Get Pokémon by ID

```
GET http://localhost:8080/api/v1/pokemon/25
```

**Response**

```json
{
    "id": 25,
    "name": "pikachu",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    "types": ["electric"],
    "abilities": ["static", "lightning-rod"],
    "stats": {
        "special-attack": 50,
        "defense": 40,
        "attack": 55,
        "hp": 35,
        "special-defense": 50,
        "speed": 90
    },
    "height": 4,
    "weight": 60,
    "description": "When several of these POKéMON gather, their electricity could build and cause lightning storms."
}
```

### Get Pokémon by Name (case-insensitive)

```
GET http://localhost:8080/api/v1/pokemon/Pikachu
```

**Response**

```json
{
    "id": 25,
    "name": "pikachu",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    "types": ["electric"],
    "abilities": ["static", "lightning-rod"],
    "stats": {
        "special-attack": 50,
        "defense": 40,
        "attack": 55,
        "hp": 35,
        "special-defense": 50,
        "speed": 90
    },
    "height": 4,
    "weight": 60,
    "description": "When several of these POKéMON gather, their electricity could build and cause lightning storms."
}
```

### Invalid Pokémon Name

```
GET http://localhost:8080/api/v1/pokemon/Pik
```

**Response**

```json
{
    "status": 404,
    "error": "NOT_FOUND",
    "message": "Pokemon not found: pik",
    "timestamp": "2025-12-24T12:03:15.0057635",
    "path": "/api/v1/pokemon/Pik"
}
```

### Get List of Pokémons for Home page with Pagination

```
 GET http://localhost:8080/api/v1/pokemon/list?offset=20&limit=20
```

**Response**

```json
{
  "count": 1350,
  "offset": 20,
  "limit": 20,
  "hasMore": true,
  "next": "/api/v1/pokemon/list?offset=40&limit=20",
  "previous": "/api/v1/pokemon/list?offset=0&limit=20",
  "data": [
    {
      "id": 21,
      "name": "spearow",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
      "types": []
    },
    {
      "id": 22,
      "name": "fearow",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png",
      "types": []
    },
    {
      "id": 23,
      "name": "ekans",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png",
      "types": []
    },
    {
      "id": 24,
      "name": "arbok",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png",
      "types": []
    },
    {
      "id": 25,
      "name": "pikachu",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      "types": []
    },
    {
      "id": 26,
      "name": "raichu",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
      "types": []
    },
    {
      "id": 27,
      "name": "sandshrew",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png",
      "types": []
    },
    {
      "id": 28,
      "name": "sandslash",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png",
      "types": []
    },
    {
      "id": 29,
      "name": "nidoran-f",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/29.png",
      "types": []
    },
    {
      "id": 30,
      "name": "nidorina",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/30.png",
      "types": []
    },
    {
      "id": 31,
      "name": "nidoqueen",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png",
      "types": []
    },
    {
      "id": 32,
      "name": "nidoran-m",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/32.png",
      "types": []
    },
    {
      "id": 33,
      "name": "nidorino",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png",
      "types": []
    },
    {
      "id": 34,
      "name": "nidoking",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png",
      "types": []
    },
    {
      "id": 35,
      "name": "clefairy",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png",
      "types": []
    },
    {
      "id": 36,
      "name": "clefable",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png",
      "types": []
    },
    {
      "id": 37,
      "name": "vulpix",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png",
      "types": []
    },
    {
      "id": 38,
      "name": "ninetales",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png",
      "types": []
    },
    {
      "id": 39,
      "name": "jigglypuff",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
      "types": []
    },
    {
      "id": 40,
      "name": "wigglytuff",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png",
      "types": []
    }
  ]
}
```
---

## Conclusion

The Pokédex Backend demonstrates best practices in backend development using Spring Boot, including clean architecture, strong validation, centralized error handling, efficient caching, and scalable pagination.
