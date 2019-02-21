FROM node:9.11.1 as build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install 
COPY . /usr/src/app

#RUN npm run build && \
#    npm prune --production 

WORKDIR /usr/src/app

CMD [ "npm", "start" ]

EXPOSE 4000
