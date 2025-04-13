# Build React frontend
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY frontend/package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps
RUN npm audit fix --force

# Copy the rest of the frontend code
COPY frontend/ ./

# Build the frontend
RUN npm run build

# Use a lightweight Nginx image for serving the built app
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the frontend port
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
