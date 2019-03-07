FROM mhart/alpine-node:11 as build

RUN mkdir /app
WORKDIR /app
ADD ./client ./client
ADD ./server ./server

ENV PATH /app/server/node_modules/.bin:$PATH

RUN cd client && \
    npm install && \
    npm run build && \
    cd .. &&\
    \
    cd server && \
    npm install && \
    npm run build && \
    \
    rm -r ../client

WORKDIR /app/server

CMD [ "npm", "start" ]

EXPOSE 4000






