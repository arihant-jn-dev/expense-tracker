
# 1. Start from the official Node.js 18 Alpine image (this is NOT your computer, but a clean Linux environment)
FROM node:18-alpine

# 2. Set the working directory INSIDE the container to /app
#    (All following commands run from here, not your local machine)
WORKDIR /app

# 3. Copy only package.json and package-lock.json from your project (on your computer) to /app in the container
#    (This is so Docker can cache npm install if dependencies don't change)
COPY package*.json ./

# 4. Install dependencies INSIDE the container (not on your computer)
#    (Runs 'npm install' in the container's /app directory)
RUN npm install

# 5. Copy the rest of your project files from your computer to /app in the container
#    (This includes your source code, config, etc.)
COPY . .

# 6. Expose port 3000 so Docker can map it to your computer
EXPOSE 3000

# 7. Set the default command to run your app inside the container
CMD ["node", "src/app.js"]
