# Node-JS-Joke-API

The Node-JS-Joke-API is an Express-based web application that allows users to manage a collection of jokes stored in a SQLite database. The API supports adding, retrieving, deleting, and resetting jokes.

## Setup

### Prerequisites
- Node.js
- npm
- SQLite3

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/Acidicts/Node-JS-Joke-API.git
    cd Node-JS-Joke-API
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and set the environment variables:
    ```env
    PORT=3000
    USER=<your-username>
    PWD=<your-password>
    ```

4. Run the application:
    ```sh
    node index.js
    ```

5. The server will be running on `http://localhost:3000`.

## Endpoints

### GET `/`
Serves the `index.html` file from the `pub` directory.

### POST `/add`
Adds a new joke to the database.
- **Query Parameters:**
  - `joke` (string, required): The joke text.
- **Responses:**
  - `201 Created`: Returns the ID and joke text of the newly added joke.
  - `400 Bad Request`: Joke is required.
  - `500 Internal Server Error`: Error message.

### GET `/jokes`
Retrieves all jokes from the database in HTML table format.
- **Responses:**
  - `200 OK`: Returns the HTML table with all jokes.
  - `500 Internal Server Error`: Error message.

### DELETE `/reset`
Deletes all jokes from the database.
- **Query Parameters:**
  - `user` (string, required): Username.
  - `pwd` (string, required): Password.
- **Responses:**
  - `204 No Content`: Jokes deleted.
  - `401 Unauthorized`: Incorrect username or password.
  - `500 Internal Server Error`: Error message.

### DELETE `/delete/:id`
Deletes a joke by its ID.
- **Path Parameters:**
  - `id` (integer, required): The ID of the joke to delete.
- **Responses:**
  - `204 No Content`: Joke deleted.
  - `400 Bad Request`: ID is required.
  - `500 Internal Server Error`: Error message.

### GET `/random`
Retrieves a random joke from the database.
- **Responses:**
  - `200 OK`: Returns a random joke.
  - `500 Internal Server Error`: Error message.

### GET `/joke/:id`
Retrieves a joke by its ID.
- **Path Parameters:**
  - `id` (integer, required): The ID of the joke to retrieve.
- **Responses:**
  - `200 OK`: Returns the joke text.
  - `400 Bad Request`: ID is required.
  - `404 Not Found`: Joke not found.
  - `500 Internal Server Error`: Error message.

## Database
The application uses SQLite3 for database management. The database file is named `database.db` and is created in the root directory if it does not exist. The `jokes` table contains the following columns:
- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT): The unique identifier for each joke.
- `joke` (TEXT, NOT NULL): The joke text.

## Environment Variables
- `PORT`: The port on which the server will run. Default is `3000`.
- `USER`: The username for resetting the jokes.
- `PWD`: The password for resetting the jokes.

## Static Files
Static files are served from the `pub` directory.

## Running the Server
To start the server, run:
```sh
node index.js
```
The server will be running on the port specified in the `.env` file or default to `3000`.
