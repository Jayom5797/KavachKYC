# ===== Build Stage =====
FROM node:18 AS build

WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript project
RUN npm run build

# ===== Production Stage =====
FROM node:18-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy only the production dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules

# Copy the built code from the build stage
COPY --from=build /app/dist ./dist

# Copy package.json for the start script
COPY --from=build /app/package.json ./

# Expose the port the app runs on
EXPOSE 8080

# Health check for the service
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Command to run the application
CMD ["npm", "start"]
