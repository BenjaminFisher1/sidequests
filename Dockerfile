# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock* ./

# use ignore-scripts to avoid building node modules like better-sqlite3
RUN bun install --frozen-lockfile --ignore-scripts

# Copy the entire project
COPY . .

# Give NUXT_DATABASE_URL environment variable to bun for use with Drizzle ORM
RUN --mount=type=secret,id=nuxt_database_url \
 export NUXT_DATABASE_URL=$(cat /run/secrets/nuxt_database_url)

RUN bun --bun run build

# Pushes drizzle schema to database
RUN bun --bun drizzle-kit push

# copy production dependencies and source code into final image
FROM oven/bun:1 AS production
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output /app

# run the app
ENTRYPOINT [ "bun", "--bun", "run", "/app/server/index.mjs" ]