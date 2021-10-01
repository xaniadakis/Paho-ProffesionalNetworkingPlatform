FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 4200
CMD ["npm", "start"]
HEALTHCHECK --interval=2m --timeout=5s --start-period=2m \
  CMD nc -z -w5 127.0.0.1 4200 || exit 1
