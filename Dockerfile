FROM node:10
WORKDIR /source
COPY /apollo-server-app ./
ENV NODE_ENV=development
RUN npm install
EXPOSE 4000
CMD npm run start
