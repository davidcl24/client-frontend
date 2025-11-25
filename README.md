# Client Frontend

This is a frontend where the users can watch movies and shows.

## Characteristics

* It allows users to create a new account or login into an existing one.
* Each user can have each watch history and favourites list.
* Easy and intuitive GUI based on Prime Video.

## Configuration

The app makes use of env variables to know the API URL and the streaming server URL

```
API_GATEWAY_URL=http://localhost:30000
STREAMING_URL=http://localhost:8080
```

## Setup

* Run `npm install` to install dependencies
* Run `npm run build` to build the release
* Run `node /app/.next/standalone/server.js`

Now the app will be runninng at [`localhost:3333`](http://localhost:30000)
