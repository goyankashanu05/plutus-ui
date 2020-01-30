FROM node:10-alpine
ENV NODE_ENV="production"
# ENV PUBLIC_URL="http://47.56.69.103/api/v1/address/"
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "serve"]