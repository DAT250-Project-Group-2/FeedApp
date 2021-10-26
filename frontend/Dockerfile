#### Stage 1: Build the react application
FROM node:12.4.0-alpine as build

WORKDIR /app

# Copy the package.json as well as the package-lock.json and install 
# the dependencies. This is a separate step so the dependencies 
# will be cached unless changes to one of those two files 
# are made.
COPY package.json package-lock.json ./
RUN npm install

# Copy the main application
COPY . ./

# Arguments
#ARG FeedApp_db
#ENV FeedApp_db=${FeedApp_db}

RUN npm run build

#### Stage 2: Serve the React application from Nginx 
FROM nginx:1.17.0-alpine

# Copy the react build from Stage 1
COPY --from=build /app/build /var/www

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the Docker host, so we can access it 
# from the outside.
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]