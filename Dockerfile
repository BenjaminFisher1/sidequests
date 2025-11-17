# Build Stage 1

FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

# Copy the entire project
COPY . ./

# Install dependencies
RUN pnpm i

# Define environment variables
ENV HOST=0.0.0.0
ENV NODE_ENV=development

# Expose the port the application will run on
EXPOSE 3000