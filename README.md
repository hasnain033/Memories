# Project: Memories Application

### Description

- A simple social media app that allows users to post interesting events that happened in their lives.
- Build and Deploy a Full Stack MERN App
  - React
  - Redux
  - Node
  - Express
  - MongoDB
- Authentication:
  - Login with Email (JWT)
  - Login with Google
  - Token Expiry
- Role for Users
  - User can views the posts, but can't like or any actions
  - Login for create new post
  - Only delete/edit information of posts that user's was create
- Responsive is support for all screen

### Tech-Stack

- Client:

  - react
  - @material-ui/core
  - react-redux
  - redux
  - redux-thunk
  - axios
  - react-file-base64
  - moment
  - jwt-decode
  - react-google-login

- Server:
  - body-parser
  - express
  - mongoose
  - cors
  - nodemon
  - jsonwebtoken
  - bcryptjs

### Directory Structure

```
.
├── client
└── server
```

## Installation Guide

### Production

- Clone this project

```
git clone https://github.com/hasnain033/memories.git
```

**Server:**

- cd to `/server`

- Install dependencies

```
npm install
```

- create `.env` file similar with my `.env.example` file
- update `CONNECTION_URL` with your url MongoDB Atlas

- Start the server, project with run on `PORT 5000`

```
npm start
```

**Client:**

- cd to `/client`

- Install dependencies

```
npm install
```

- Start the server, project with run on `PORT 3000`

```
npm start
```


- If have any question? Open issues or Email me: eng.hasnain99@gmail.com

