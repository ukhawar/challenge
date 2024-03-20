# Stage 1: Build the Vue 3 TypeScript app
FROM node:14 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the Vue 3 TypeScript app
RUN npm run build

# Stage 2: Serve the built Vue app using Nginx
FROM nginx:alpine

# Copy the built app from the previous stage to the nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the container's port, where the Vue app will run
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
