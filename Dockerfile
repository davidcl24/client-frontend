# ============================
# 1) Etapa de dependencias
# ============================
FROM node:22.17.0-alpine AS deps

WORKDIR /app

# Dependencias necesarias para compilar módulos nativos
RUN apk add --no-cache --virtual .build-deps \
    python3 make g++ libc6-compat

COPY package*.json ./

RUN npm install --production=false


# ============================
# 2) Etapa de build
# ============================
FROM node:22.17.0-alpine AS build

WORKDIR /app

# Necesario para que Next.js funcione en Alpine
RUN apk add --no-cache libc6-compat

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# ============================
# 3) Etapa de runtime
# ============================
FROM node:22.17.0-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.js ./

EXPOSE 3333

CMD ["npm", "start"]
