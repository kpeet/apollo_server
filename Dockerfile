FROM jupitercl/sls-apollo-server-aws-lambda
WORKDIR /apollo
COPY /apollo-server-app ./
RUN npm install
EXPOSE 4000
