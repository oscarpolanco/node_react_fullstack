# Node & React fullstack development project

## Section 1: Course content

On this section, we will target all the information to begin to work and learn all the topics of the course

### Adding prettier

As a recommendation, we add `prettier` to work on the course so `prettier` will help us to automatically format our `js` files to follow guidelines that are pre-determined by its configuration.

#### Step to add prettier on vs code

- Install [nodejs](https://nodejs.org/en/)
- Create a `package.json` file using `npm init` command
- Install as a `dev` dependency the `prettier` package using `npm install --save-dev prettier`
- Create a `.prettierrc` file on your root directory
- Add `{}` on your `.prettierrc` to get a basic configuration
- Go to the `code` section in `vs code`
- Go to the `setting` option
- Find the `format on save` option and check it
- Find the `Prettier:Require config` option and check it

### App specification

On this section we got a breif introduction of the app that we gonna build and here are some specifications:

- Someone uses startup owner's app/service
- Startup owner wants feedback
- Send customer an email requesting feedback
- Get tabulation of results
- Make app/service better with feedback!

## Section 2: Server Architecture

The goal of this practice is that we got an understanding of how each piece of the app combines the information that the user needs. When a user navigates and go to our domain we are gonna send some `HTML` and `js` files from our `React` application but the `React` app doesn't exactly know what to show to the user because it needs a certain amount of data; this information is going to be store on `MongoDB` but we need an efficient way to transmit all this data to our `React` application so we are going to do an `express` API that is gonna have a bunch of business logic to take the incoming request of our `React` app then pull some information from the `MongoDB` database then send that information to the `React` side of the app.

The `React` app and the `express` API are going to be communicating with `HTTP` request that contains a `JSON` and the `express` API and the `MongoDB` database is going to be communicating with an internal process that we gonna address later.

### A litte overview of node and express

First a little definition:

`Node`: Javascript runtime used to execute code outside of the browser.
`Express`: Library that runs in the Node runtime. Has helpers to make dealing with HTTP traffic easier.

#### How they work togheter

When you're running a server on your local machine you're gonna be receiving `HTTP` request on a single port so if a browser on our machine makes a request will be received for a port on our machine then `node` will be listening that port and wait for information that flows in throw it; then `node` is going to take the information that flows into the port and send it to the `express` side of our application than `express` is gonna decide what little bit of logic is going to handle and response the incoming request. On `express` we create a `Route handlers` that are used to handling `HTTP` requests that ask for a specific service. When we got the response is going to be sent back to `node` then it gonna respond to the incoming request with that response that it received.

### Adding our first route handler

- First on the `server` directory we add a new file `index.js` (By convention we put that name).
- Then need to `require` the `express` to the file:
  `const express = require("express");`
- Create a instance of `express`
  `const app = express();`
- Use the instance of `express` to handle a incoming request (in this example we use the `get` function to listen all request that came from `/`)

```js
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});
```

    * app => Express App to register this route handler with
    * get => Watch for incoming requests with this method (The `HTTP` methods indicate the type of the request) and `express` have access to a couple methods like the following:
        - get => Get info
        - post => Send info
        - put => Update all the properties of something
        - delete => Delete something
        - patch => Update one or two properties of something
    * '/' => Watch for requests trying to access '/'
    * req => Object representing the incoming request
    * res => Object representing the outgoing response
    * res.send({ hi: 'there' }) => Immediately send some JSON back to who ever made this request

- Finally `express` need to let know to `node` that it need to listen a port(in this case `5000`)
  `app.listen(5000);`
- Go to the `server` directory
- Use the `node` command to start your server
  `node index.js`

### Heroku checklist

We gonna use [Heroku](https://www.heroku.com/) as our service provider of this project so we need to set our app to be ready to deploy to `Heroku` and we use a series of steps to accomplish this process. Here are the steps:

- Dynamic port binding:
  When you `deploy` an app to `Heroku` it will spect that you listen for `HTTP` request on a specific port and will tell us witch `port` you need to listen; because `Heroku` use the same server for multiples apps and needs to tell a specific port for your use. We will use a constant that uses the `process.env` for this purpose and use it on the `listen` function that we use before.

```js
const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

When `Heroku` runs our app it will inject `environment variables` that are variables that are set on the underline runtime that `node` is running on the top of and if the opportunity that `Heroku` has to pass `runtime` configurations. We need this because we don't know with `port` we will use on advance so we need to wait until we deploy our app to know it but on `production` we will have access to those `environment variables` so for `development` we will use a fix `port`.

- Specify node environment:
  `Heroku` by default use a specific version of `node` but can be a little out of date version so maybe some of your features have issues so we need to specify witch version of `node` we gonna use and we do it adding this `engines` with your `node` and `npm` version on your `package.json`.

```js
"engines": {
  "node": "10.15.3",
  "npm": "6.4.1"
}
```

- Specify start script:
  We need to specify a command that `Heroku` can use to `start` our app so we just need to add a `script` on our `package.json` for this propose using the same command that we use to run the project before.

```js
"scripts": {
  "start": "node index.js"
}
```

- Create a .gitignore file:
  We don't need all the files that we use on our app to get store in some place because some of then automatically generate so we don't need to upload that kind of files and the `.gitignore` will help use to this.

### Installing Heroku on your local

To install `Heroku CLI` you just need to follow these steps:

- You will need to create an account on [Heroku](https://www.heroku.com/)
- Then need to install the [git](https://git-scm.com/) on your local
- Finally, follow [this steps](https://devcenter.heroku.com/articles/heroku-cli) to install `Heroku CLI`
- On your terminal use `git --version` to check if the installation was successful
- Then use `heroku -v` to see if you correctly installed `Heroku CLI`

### Verifying Heroku Deployment

To do the first `deploy` to `Heroku` we just follow the next steps:

- Create a `git` repository
- Add all your changes to the `master` branch (By convention we `master` is our clean branch that represents production)
- Make sure that on your terminal you are on the `master` branch(But is possible do the deploy on another branch)
- On your terminal, you need to `login` to `Heroku` using the command `heroku login`.
  It will happen one of 2 things:
  - Ask your credential directly on the terminal
  - Ask to press any key to open your browser; then press the `login` button and automatically it will `login` on your terminal
- Then we need to create an app using the `heroku create` command.
  This will automatically create an app that will be available on `Heroku` and will output on your terminal 2 links; the first one is the public URL of our app(This URL will have an auto-generated name) and the second link is the `deployment` target in witch we are gonna push our code.
- Add the `Heroku` repository code to your `remote` using `git remote add heroku https:\\the.url.of.your.app` (It will do it atomically but in case that doesn't happen we can do it like this)
- Use `git remote -v` to check if you got the `heroku` remote
- Then deploy your add using `git push heroku master`
  This will push your code to `Heroku` and use the branch that you currently are on your terminal as `master`(In case you need to push a specific folder go to the next `Deploy a sub-directory on Heroku`)
- Use the `heroku open` command to open on your browser your app
- If something fails you can use the `heroku logs` command to check the logs of the server.

### Deploy a sub-directory on Heroku

In this repository case, we add some configuration that we don't need to deploy for the moment that is why here we push a subdirectory to `Heroku`. I follow the same steps then before just with one change; we use a different command to deploy our changes
`git subtree push --prefix your_directory_name heroku master`

## Section 3: Authentication with Google OAuth

We are gonna be using `Google OAuth` to authenticate the user of our app so here is a brief preview of the process that we gonna follow.

- User click `Login`:
  On the `client` the user will have a button that reads `login with google` that he is gonna press to authenticate. This will lunch a request to our `server`; for example `http://localhost:5000/auth/google`

- Forward user's request to Google:
  When the `server` detects that someone is trying to authenticate it will immediately forward the request to `Google` in other words if a user ask to log in it need to go to Google's server and grant permission so our app can read his profile. For example, using this URL: `https://google.com/auth?appid=123`
  We are gonna address later what is the `appid`.

- Ask user if they grant permission:
  When we redirect the user to `Google` it will show a permission page(It will ask the user that an app is asking to access its Google profile).

- User grants permission
  The user just need to grant the permission using the instructions on the permission page and immediately will be redirect to our add to one of our handlers; for example: `http://localhost:5000/auth/google/callback?code=456`
  The `route` of the handler is just an example that could be anything that you want but the `code` is a place as a `query parameter` by `Google`.

- Put the user on hold, take the `code` from the URL:
  We gonna put the user on hold and we will take the code from the URL to continue processing the authentication process sending another request.

- Send a request to `Google` with the `code` included:
  We do a follow-up request including the `code` to Google's servers, in other words, you tell Google's servers that you have a user pending in our server and we are sure that he grants us access to his profile so here is the code to prove it and we need to exchange this code for information about this user.

- `Google` sees the `code` in the URL, replies with details about this user:
  `Google` will see the `code` and will check if that is legit and if it is will reply with some useful information to our server.

- Get user details, create a new record in the database:
  The details that `Google` replies to us will we store in the database that will help us to continue with the authentication process.

- Set user ID in a cookie for this user:
  We gonna do a process to uniquely identify the user for future requests.

- Logged in:
  Get the user to another `route` and we will consider the user log in. For example, the `route` could be: `http://localhost:3000`.

- I need some resources from the API:
  So when the user makes an action or needs something from the API we gonna do a follow request with a cookie include.

- This request has a cookie with user id equal to `123`:
  The `id:123` is just an example following the previews URLs examples. Now all the request that the user makes will have this cookie with some of his information.

### Passport overview

To create the authentication flow with `Google` we are gonna be using a library called `Passport js`. This library is going to handle from `Forward user's request to Google` to `Google sees the code in the URL, replies with details about this user` (see the preview topic about the authentication flow). There are 2 things you need to be aware when you are using `Passport js`:

- First `passport` doesn't automate the complete auth process that is why we need to add some code in specific parts to get the auth process complete working. This will give you the feeling that you don't understand the complete auth process and just adding some code of things that you don't have a clear view.
- The second one is that sometimes we don't get how the library is structure because you don't only install 1 library at least you need to install 2 libraries to get this to work.

#### Passport library component

- `passport`:
  Is the core library is a set of very general functions, objects, and helpers that make authentication work nicely inside of `express`
- `passport strategy`:
  To set authentication for a very specific provider. For each provider that you need to authenticate you will use a `strategy` for each one.

### Passport setup

- First we need to install `passport` and our `strategy` in this case for `Google`
  `npm install --save passport passport-google-oauth20`

- Then on the server `require` those 2 dependencies. For now we only need `Strategy` from the `passport-google-oauth20`

```js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
```

- Call `passport` and give the `strategy` that you need for the authentication
  `passport.use(new GoogleStrategy());`

  - `new GoogleStrategy()`: Create a new instance of the `Google` authentication strategy and on the constructor we are going to send a configuration that we need to authenticate the user on our app.
  - `passport.use()`: Since `passport` have a generic set of function, objects and helpers we need to let it know that is a new `stretegy` available and the users can be authenticated with it.

### Enabling Google OAuth API

To use the `Google strategy` that we install before we need 2 things: a `client id` and a `client secret` provided by the `Google OAuth` service so here we gonna go step by step on that process.

#### Steps to create a project and obtain the client's id and secret

- Go to: https://console.cloud.google.com
- On your dashboard at the top click on the `CREATE PROJECT` button
- Add the `project name`
- Click the `create` button
- At the top left corner click on the `hamburger` menu
- Click the option `API & Services`
- On the submenu click on the `OAuth consent screen`
- In the left side menu choose `OAuth consent screen`
- Check the `External` option
- Click on `CREATE`
- Fill the `Application name` (put the same that you use before)
- Scroll to the button and click `Save`
- On the left side, menu click on the `Credentials` option
- Click on `CREATE CREDENTIALS` at the top of the `credentials` page
- Select `OAuth client ID`
- On the `Application type`, options check the `Web application`
- Scroll to the `Authorized JavaScript Origins` an put your authorize URL; in this case, since we are on the development process we put `http://localhost:5000`
- Scroll to `Authorized redirect URI` and put the URL that `Google` will reach after the client allow your app
- Click on the `Create` button
- Copy your `client id` and `client secret`

#### Client id and client secret

- `Client id`: It's a public token that identifies your app for Google's server.
- `Client secret`: Private token that gives access to our app.

#### Add configuration for the strategy

You just need to add your app credential that we generate before and send the `callback` URL to redirect users that came from that URL on an object and a second parameter is a function that we gonna user later.

```js
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientIID,
      clientSecret: keys.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accesToken) => {
      console.log(accesToken);
    }
  )
);
```

#### Adding a handler to begin the authentication process

We need a `route handler` that triggers when the user wants to authenticate. We for the example aad `/auth/google`.

```js
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
```

- `passport.authenticate`: Instead of sending a function like we normally do as a second argument, we use `passport` to begin the authentication process.
  - `google` parameter: Is the name of the strategy we're gonna use. Internally `GoogleStrategy` has this name as its identifier.
  - `scope: ["profile", "email"]`: Specify to Google's servers what access we want to have inside of this user profile. In this case, we are asking for the user's information and its email.

### Authorized redirect URL

If you test at this moment the route that we did to begin the authentication process(`auth/google`) you will redirect correctly to Google's URL but will have a `redirect_uri_mismatch`. This happens because of one of our `query parameters` in this case the `rediirect_uri` that we send it with the correct value but is not set to be a recognize redirect URL on Google's servers. This is a security measure to protect the users to be redirect to a malicious site to steal his information.

To fix this error you just need to copy the URL that is shown on the error that you get on the browser than on the `Authorize redirect URIs` you will need to add the URL that we set as our `callback`(for this example `http://localhost:5000/auth/google/callback`) and then click `save`.

You will need to wait a couple of minutes to check if it works because Google's servers need time to add the `callback` URL to their acceptance URL list.

### Oauth callbacks

Now that we get to the Google login screen we need to create the `route handler` that handles the `callback` URL that the user is redirected after login. For this like the others before we don't use a function to run when we receive a request that matches the pattern of the `route handler`; we use `passport`.

```js
app.get("/auth/google/callback", passport.authenticate("google"));
```

This look like the first `route handler` that we set but the difference is that when you get the request you will receive the `code` that Google sends to you as a `query parameter` so `passport` when it sees this it will know that the user is no trigger the authentication process instead they want to convert this `code` into profile information. So if you test and login at this point we will log a big string on the terminal that is the function that we send on the configuration of the `passport.use` configuration and get on the login page on the browser because we didn't set anything to be redirected.

### Access and refresh token

On the function that we are running when Google retrive to our callback url with a `code` we can get some more information than the `access token` so we gonna check some of this things that we can get when we authenticate.

```js
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientIID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accesToken, refreshToken, profile, done) => {
      console.log("access token", accesToken);
      console.log("refresh token", refreshToken);
      console.log("profile:", profile);
    }
  )
);
```

- `Access token`: Is the `token` that will allow us to do something on the user behalf like modify his account in some fashion.
- `Refresh token`: Will allow us to refresh the `access token` because it expired in some amount of time and we can use this `refresh token` to automatically refresh the `access token`.
- `Profile`: Have the user information.

## Section 4: Adding MongoDB

### The theory of authentication

So at this point what really means to be authenticated on our app or why we care about it. First when we need something of our server we do an `Http` request and that request is `stateless` this means that between any given 2 separate requests `Http` can't share information(This is by default); so we need a way to have some source of information that helps us to store this state that we are missing with the default `Http` configuration. To handle this we use authentication where a user does a request to the server with his credential to login; now the server decides if the credential is valid; if this is the case the user is considered log in then the server sends a request with a unique piece of information(cookie; token; etc) that need to be add in every follow-up request so the server can identify the identity of the user.

### Singing users with OAuth

In the preview section, we focus only on the `OAuth` part of the login flow; now we gonna dive a little bit on the complete flow that the user will have from the first time that asks to sing up to the logout.

- First, our user ask our server to sing him up so it will begin the `Google` flow to ask the user the profile information
- The server asks the database to create a record to the new user
- The database(MongoDB) will store. For our add, we gonna extract the `Google id` from the user profile to store it on our database.
- Then the server will create a cookie with unique information that represents the user that sign up
- After that, the server will send that cookie to the browser
- Now the user can do any follow-up request to the server and will have access to the information that it needs
- Then the user can logout when it needs
- When it does log out the server will unset the cookie and now the cookie will be invalid and the user will be considered logout
- Also now the user needs to log in again. He will do the `Google OAuth` process again and send its profile
- The server gets the profile and instead of creating a new record it will search on the database if this record exists
- If it doesn't exist will create the record if it exists will set the cookie for the user
- If the user is set will be considered login again

### Introduction to MongoDB

At the begining we check how we will build our app. We said that we gonna have a `React` app that comunicate via `Http` request with some `JSON` data with `expess/node` api then this `express/node` api will comunicate with `Mongo DB` to get or store information but on our case we gonna have a intermediary to comunicate the `express/node` api with `Mongo DB` call `Mongoose`. `Mongoose` is a library that wrap up some of the most commun `Mongo DB` operations and we don't have to do it ourself.

#### How Mongo store information internally

`Mongo DB` internally store records on different `collections` that can have many records. So in one `Mongo DB` instance we can have may `collections`; for example users, posts or payments.

Inside of a `collections` we can have many records. For example, for our app, we can have `collections` users that have many records that represent each user that can log in to our application. Every single record is a piece of `JSON` or a plain `js` object in other words every single record is a collection of key-value pairs. One of the characteristics of `Mongo DB` is that it is `schemaless` this means that on the same `collection` we can have records with its own set of properties. For example:

```js
//User collection's
{
  id: 1,
  name: "bill",
  height: 150
}
{
  id: 2,
  name: "alex",
  age: 30
}
{
  id: 3,
  name: "zane"
}
```

#### Mongoose

Like we see before on `Mongo DB` we have a `collection` with many different `records` but we need a way to represent this in our `js` app context so `mongoose` will help us with that.

In the `Mongoose` context, we will have a `Model class` that represents a `Mongo DB collection` so a `model class` is used to access a single `collection` of `Mongo DB`. A `model class` have a bunch of function that will work with the `collection` like find a `record` or `update` a `record`.

Also `mongoose` gives us access to `model instances` that is a `js` object that represents a single `record`.

### MongoDB Atlas setup and configuration and Moongose setup

For this project, we gonna use a remote service that creates a `Mongo` database for use that is called `Mongo DB Atlas`. Here are the steps to set up your `Mongo DB atlas` account and database.

- Go to => https://www.mongodb.com/cloud/atlas
- Click the `Try Free` button
- Create your `Mongo DB` user account
- After creating the account click on `create cluster`
- Choose the `free` option
- Then choose the `AWS` option and `Virginia`
- Scroll down and put the name of your app in the `cluster name` option
- Click on `create cluster`
- Know you will see a dashboard page of your cluster
- Click the `connect` button
- Click on `add your current IP address`
- Add the IP address that appears
- Add your `user`(name and password - is better to use the autogenerate password)
- Then on the `connect` button, you will see `choose the connect method`
- Choose `connect your application`
- Copy the connection String Only and use it on your code
- On your terminal go to the `server` directory
- Install `mongoose` using `npm install --save mongoose`
- Go to the `index.js` file on your editor
- Require `mongoose`
  `const mongoose = require("mongoose");`
- Use the `mongoose` connect function sending your `mongo` URI
  `mongoose.connect(my_mongo_uri);`
- Know run your `server` and you are connected

#### Note:

Maybe you will see a couple of `warnings` on your terminal when you run the server but its completely fine. These `warnings` produce automatically by `mongo`. The `mongo` database has a `driver` layer that let outside people to interact with the database so the `warnings` are produced by the way that `mongoose` interacts with `mongo` so we can't ignore this `warnings`.
