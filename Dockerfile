# ============================
# 1) Etapa dependencias
# ============================
FROM node:22-slim AS deps

WORKDIR /app

COPY package*.json ./
RUN npm install


# ============================
# 2) Etapa build
# ============================
FROM node:22-slim AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# ============================
# 3) Etapa runtime
# ============================
FROM node:22-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.js ./

EXPOSE 3333

CMD ["npm", "start"]
