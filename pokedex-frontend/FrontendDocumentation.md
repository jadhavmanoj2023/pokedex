# Pokédex Frontend

## Overview

The **Pokédex Frontend** is a responsive, single-page React application that consumes the Pokédex Backend APIs to provide a rich and interactive Pokémon search experience.

It allows users to:

* Browse Pokémon using a **paginated grid**
* Search Pokémon by **name or ID**
* View **detailed Pokémon information** with visually rich UI
* Handle loading, errors, and edge cases gracefully

The frontend is designed with **component reusability**, **clean separation of concerns**, and **performance** in mind.

---

## Tech Stack

* React (Create React App)
* JavaScript (ES6+)
* HTML5 & CSS3
* Fetch API
* react-toastify (notifications)
* Environment-based configuration (`.env`)

---

## Application Architecture

The frontend follows a **component-based architecture** with a clear separation between:

```
UI Components → Service Layer → Backend APIs
```

### High-Level Flow

1. UI components trigger user actions (search, click, pagination)
2. Service layer (`pokemonService`) calls backend REST APIs
3. Responses update React state
4. UI re-renders based on updated state

---

## Folder Structure

```
pokedex-frontend
│
├── public
│   ├── index.html
│   └── pokedex_logo.png
│
├── src
│   ├── components
│   │   ├── Header
│   │   ├── PokemonCard
│   │   ├── PokemonDetail
│   │   └── PokemonGrid
│   │
│   ├── services
│   │   └── pokemonService.js
│   │
│   ├── utils
│   │   └── typeColors.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
│
├── .env
├── package.json
└── README.md
```

---

## Entry Point

### `index.js`

```js
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Responsibilities**

* Bootstraps the React application
* Mounts the root `<App />` component
* Enables React Strict Mode for development warnings

---

## Root Component

### `App.jsx`

The **central orchestrator** of the application.

### Responsibilities

* Maintains **global application state**
* Handles:

  * Pokémon list pagination
  * Pokémon search
  * Selected Pokémon details
  * Loading & error states
* Coordinates data flow between components

### Key State Variables

| State             | Purpose                           |
| ----------------- | --------------------------------- |
| `pokemonList`     | Stores paginated Pokémon list     |
| `selectedPokemon` | Stores currently selected Pokémon |
| `searchQuery`     | Search input value                |
| `loading`         | Global loading indicator          |
| `error`           | Error messages                    |
| `pagination`      | Offset, limit, and `hasMore`      |

### Core Functions

* `fetchPokemonList(offset, limit)`
* `fetchPokemonDetails(nameOrId)`
* `handleSearch()`
* `handleLoadMore()`
* `handleCardClick(pokemon)`
* `handleBackToHome()`

### Conditional Rendering

```jsx
{selectedPokemon ? (
  <PokemonDetail />
) : (
  <PokemonGrid />
)}
```

---

## Service Layer

### `services/pokemonService.js`

Acts as the **API communication layer** between frontend and backend.

### Purpose

* Centralizes backend API calls
* Handles HTTP response parsing
* Normalizes error handling

### Environment Configuration

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1/pokemon
```

### API Methods

#### `getPokemonList(offset, limit)`

Calls:

```
GET /api/v1/pokemon/list
```

Returns paginated Pokémon list.

#### `getPokemonDetails(nameOrId)`

Calls:

```
GET /api/v1/pokemon/{nameOrId}
```

Returns full Pokémon details.

### Error Handling Strategy

* Parses backend error response
* Throws standardized `Error` object with:

  * `message`
  * `status`
  * `code`

This allows UI components to react appropriately (toast messages, warnings, etc.).

---

## Utility Layer

### `utils/typeColors.js`

Defines Pokémon **type-to-color mapping**.

```js
export const TYPE_COLORS = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  ...
};
```

**Used for**

* Card backgrounds
* Detail page gradients
* Type badges

This improves UI consistency and visual clarity.

---

## UI Components

### 1. `Header`

**Purpose**

* Displays app logo
* Provides search input
* Shows example Pokémon buttons

**Key Features**

* Search on button click or Enter key
* Clickable logo to reset to home
* Predefined example searches

---

### 2. `PokemonGrid`

**Purpose**

* Displays Pokémon in a responsive grid
* Handles pagination UI

**Features**

* Renders multiple `PokemonCard` components
* Shows loading spinner
* Displays “Load More” button
* Shows end-of-list message

---

### 3. `PokemonCard`

**Purpose**

* Displays Pokémon summary in grid

**Displayed Data**

* Pokémon ID
* Image
* Name
* Primary type

**Interaction**

* Clicking the card opens detailed view

---

### 4. `PokemonDetail`

**Purpose**

* Displays detailed Pokémon information

**Displayed Sections**

* Name & ID
* Official artwork
* Description
* Height & Weight
* Types (colored badges)
* Abilities
* Base stats (progress bars)

**UI Enhancements**

* Dynamic background gradients based on Pokémon types
* Stat-based color coding
* Decorative Pokéball elements

---

## Notifications & UX

### Toast Notifications

Implemented using **react-toastify**.

Used for:

* Invalid input warnings
* Pokémon not found
* Backend/API failures
* Service unavailability

```jsx
<ToastContainer position="top-right" autoClose={3000} />
```

---

## Error Handling & Edge Cases

Handled gracefully at UI level:

| Scenario                | UI Behavior         |
| ----------------------- | ------------------- |
| Empty search            | Warning toast       |
| Pokémon not found (404) | Error toast         |
| Invalid input (400)     | Warning toast       |
| Backend down (503)      | Error toast         |
| Network failure         | Generic error toast |

---

## Performance Considerations

* Pagination prevents loading all Pokémon at once
* Backend caching ensures fast repeat requests
* Minimal re-renders through controlled state updates
* Lightweight components with focused responsibilities

---

## How to Run the Frontend

### Steps

1. Clone the repository:

```bash
git clone <frontend-repo-url>
cd pokedex-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1/pokemon
```

4. Start the application:

```bash
npm start
```

5. Open in browser:

```
http://localhost:3000
```

---

## Conclusion

The Pokédex Frontend demonstrates:

* Clean React component architecture
* Strong separation between UI and service layers
* Robust error handling
* Rich, responsive UI
* Seamless integration with a RESTful backend

---
