# Expense Tracker Project: EXPLAINED

This document explains the key concepts, files, and commands used in your Dockerized Node.js + Postgres project, in simple terms.

---

## 1. Dockerfile
- **What it is:** A recipe for building the environment your Node.js API runs in.
- **What it does:**
  - Starts from a Node.js image (like a blank computer with Node installed).
  - Installs your app's dependencies.
  - Copies your code into the image.
  - Tells Docker how to start your app (`node src/app.js`).
- **Why:** Ensures your app runs the same everywhere (your laptop, cloud, etc).

---

## 2. docker-compose.yml
- **What it is:** A file that defines and manages multiple containers (services) together.
- **What it does:**
  - Starts both the API and the Postgres database as separate containers.
  - Sets up environment variables for each service (like DB name, user, password).
  - Maps ports so you can access the API and DB from your computer.
  - Defines a **volume** so your database data is saved even if the container stops.
- **Why:** Makes it easy to run and manage your whole stack with one command.

---

## 3. Volumes (Data Persistence)
- **What it is:** A way to store data outside the container, on your computer.
- **What it does:**
  - The line `- pgdata:/var/lib/postgresql/data` tells Docker to save all Postgres data in a named volume called `pgdata`.
  - This volume lives on your host machine, not inside the container.
- **Why:** Your data survives container restarts, rebuilds, and even upgrades.

---

## 4. Environment Variables
- **What they are:** Settings passed into containers to configure things like DB name, user, password, host, and port.
- **How they're used:**
  - The `db` service uses `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` to set up the database.
  - The `api` service uses `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` to connect to the database.
- **Why:** Keeps sensitive info and config out of your code, and makes it easy to change settings.

---

## 5. Building & Running
- **Build:**
  - `docker-compose up --build` builds the images (using the Dockerfile) and starts all services.
- **Stop:**
  - `docker-compose down` stops and removes all containers and networks.
- **Restart:**
  - `docker-compose restart` restarts all containers.
  - `docker-compose restart api` or `db` restarts just one service.
- **Rebuild:**
  - `docker-compose build api` rebuilds just the API image.
- **Why:** Lets you control your environment easily.

---

## 6. Database Migrations
- **What it is:** A way to create/update your database tables using code (Sequelize migrations).
- **How to run:**
  - `docker-compose exec api npx sequelize-cli db:migrate`
  - This runs the migration tool inside the API container, creating tables in the Postgres DB.
- **Why:** Keeps your database schema in sync with your code.

---

## 7. Inspecting & Debugging
- **Check logs:**
  - `docker-compose logs api` or `db` shows logs for each service.
- **Open a shell in a container:**
  - `docker-compose exec api sh` or `docker-compose exec db sh`
- **Access Postgres:**
  - `docker-compose exec db psql -U user -d expenses_db`
- **Why:** Lets you see what's happening and debug issues.

---

## 8. How Everything Connects (Summary)
- The API and DB run in separate containers.
- The API connects to the DB using the environment variables you set.
- Data is stored in a Docker volume so it persists.
- You control everything with Docker Compose commands.

---

**This file is your quick reference for how your system is built, runs, and stores data!**
