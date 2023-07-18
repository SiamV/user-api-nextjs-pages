FROM node:lts as dependencies
WORKDIR /user-api-nextjs-pages
COPY package.json package-lock.json ./
RUN npm install ci

FROM node:lts as builder
WORKDIR /user-api-nextjs-pages
COPY . .
COPY --from=dependencies /user-api-nextjs-pages/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /user-api-nextjs-pages
ENV NODE_ENV production

COPY --from=builder /user-api-nextjs-pages/public ./public
COPY --from=builder /user-api-nextjs-pages/package.json ./package.json
COPY --from=builder /user-api-nextjs-pages/.next ./.next
COPY --from=builder /user-api-nextjs-pages/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
