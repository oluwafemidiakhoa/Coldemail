# Dockerfile
FROM node:20-alpine

WORKDIR /app

# 1) copy package files
COPY package*.json ./

# 2) install deps & generate prisma client
RUN npm install
RUN npx prisma generate

# 3) copy the rest of your code
COPY . .

# 4) build Next.js
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
