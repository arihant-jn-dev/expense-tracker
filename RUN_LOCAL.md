# How to Run Locally (Without Docker)

Follow these steps to run your Expense Tracker API on your local machine using your own Postgres installation.

---

## 1. Install Dependencies
```sh
npm install
```

## 2. Install & Start Postgres
- If you don't have Postgres, install it (e.g. with Homebrew):
  ```sh
  brew install postgresql@14
  brew services start postgresql@14
  ```
- If already installed, just start the service:
  ```sh
  brew services start postgresql@14
  ```

## 3. Initialize Postgres (if needed)
If you see errors about missing data directory, run:
```sh
initdb /opt/homebrew/var/postgresql@14
```

## 4. Create Database and User
```sh
psql -U <your-mac-username> -d postgres
```
Then in the psql prompt:
```sql
CREATE DATABASE expenses_db;
CREATE USER "user" WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE expenses_db TO "user";
\q
```

## 5. Create a .env File
Create a `.env` file in your project root with:
```
DB_NAME=expenses_db
DB_USER=user
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

## 6. Update Sequelize CLI Config
In `config/config.js`, make sure the host is set to `localhost` for development:
```js
host: process.env.DB_HOST || "localhost",
```

## 7. Run Migrations
```sh
npx sequelize-cli db:migrate
```

## 8. Start the API
```sh
npm start
```

---

Your API will now be running at http://localhost:3000 and using your local Postgres database!
