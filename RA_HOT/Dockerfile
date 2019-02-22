FROM mhart/alpine-node:11 as build

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install 
COPY . /app
RUN npm run build
CMD [ "npm", "start" ]
EXPOSE 3000
