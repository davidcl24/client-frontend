# ============================
# 1) Etapa de dependencias
# ============================
FROM node:22.17.0-alpine AS deps

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (usa npm, pnpm o yarn)
RUN npm install --production=false


# ============================
# 2) Etapa de build
# ============================
FROM node:22.17.0-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Compilar Next.js
RUN npm run build


# ============================
# 3) Etapa de runtime
# ============================
FROM node:22.17.0-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

# Copiar dependencias de producción
COPY package*.json ./
RUN npm install --only=production

# Copiar build de Next.js
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/package*.json ./

EXPOSE 3333

# Next.js en modo producción
CMD ["npm", "start"]
