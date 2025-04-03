# Bike Website 3

Bike Website 3 is a web application that consists of two separate applications:

- **Client**: A React-based frontend
- **Server**: An Express.js backend

## Project Structure

The project is divided into two main directories:

- `/client` - React frontend
- `/server` - Express backend

## Requirements

To run this project, you need to have:

- **Node.js** (with npm)
- **MongoDB** (for database storage)

## Installation & Setup

Before running the application, install dependencies in both directories separately.

1. Navigate to the **client** folder and install dependencies:

   ```sh
   cd client
   npm install
   ```

2. Navigate to the **server** folder and install dependencies:

   ```sh
   cd ../server
   npm install
   ```

## Database Configuration

The application requires a **MongoDB** database. You need to configure the database connection in the `.env` file located in the `/server` directory.

Edit a `.env` file in `/server` the following line using your database name and connection:

```env
DB=mongodb://127.0.0.1/bike_service
```

## Running the Application

After installing dependencies, start both applications separately.

1. Start the **backend** server:

   ```sh
   cd server
   npm start
   ```

2. Start the **frontend** React app:

   ```sh
   cd client
   npm start
   ```

Now, the application should be running, with the backend handling API requests and the frontend rendering the user interface.

## License

This project is open-source and available under the MIT License.

