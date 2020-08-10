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

### Mongoose model classes

Like we mentioned before the `model class` represents the `collections` of `Mongo DB`. This `models` will help us to create or make operations that we need to do with `mongo`. Here are the steps to do it:

- On this project, we will add the files that we need to create the `model` on a directory called `models` inside of the `server` directory.
- On the `models` directory create a file call `User.js`; that will represent the `user` collection
- Then inside of `User.js` require `mongoose`
  `const mongoose = require("mongoose");`
- Then create get the property `Schema` from `mongoose`
  `const { Schema } = mongoose;`
- Now we need to create the `schema` for our collection

  ```js
  const userSchema = new Schema({
    googleId: String,
  });
  ```

  We create the `user` and will have a property called `googleId`(for this example we gonna store the id that we receive when the user does the authentication process) that receive a `string`.

- Now we need to tell `mongo` that a `schema` needs to be createds
  `mongoose.model("users", userSchema);`

  In the `mongoose model` function we send the name of the `collection` and the `schema` that will have the record.

- Now we need to run this files; so go to the `index.js` file and require the `User.js` file
  `require("./models/User");`

  At this moment every time we run our `server`, this configuration will run.

#### Notes

- On `Mongo DB` you have many `records` in a `collection` and those `records` can have their unique set of properties but using `mongoose` a `Schema` requires to know with properties will have those `records` so we kind of lose the ability to have a set of individuals properties on a `record`.
- On the `Schema` you can add and subtract properties as you need without issues.

### Saving model instances

Now that we create the `schema` and `mongo` knows that we need a `collection` that uses that `schema`; we need to begin the process of saving data on using the `model` instance. To do this we gonna follow the next steps:

- First, on the file that we got the `passport` logic(In the case of the example we separate it from the `index.js` to a file called `paasport.js`) we need to get the `model` normally we `require` what we need on the file but for `models classes` we don't gonna be using `require` statement; the reason is that sometimes when you're running your code on a testing environment your `models` will be `require` multiple times using a `require` statement and that will confuse `mongoose` that will belive that you're trying loading multiple `models` with the same name and that will throw an error so we gonna `require` a little bit different.

```js
const mongoose = require("mongoose");

const User = mongoose.model("users");
```

We `require` the `mongoose` module then we use the `model` function with the name of the `collection`(in this example `users`) to pull/fetch from `mongo` that specific `collection`. Previously we use the `model` function to load the `schema` to a `collection` sending 2 parameters so to pull/fetch something like this we use the same function with just one argument.

- Then we need to create an instance of the `model class` to create a record.

```js
new User({
  googleId: profile.id,
}).save();
```

We use the `new` keyword on the `collection` that we just fetch sending an object with all properties that the `record` will have but this is not enough because we at this moment the `record` will exist just on the `js` world so we need to call the `save` function to actually store the `record` on `mongo`.

At the end, we create the new `record` using the callback function that is a call at the en of the `passport` authentication process.

```js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientIID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile) => {
      new User({
        googleId: profile.id,
      }).save();
    }
  )
);
```

But if you are following this example at this moment maybe you have an `error` that said `schema hasn't been registered for model users`. This production by the order of operations that we set on our `index.js` file; this mean that we when we separate the `passport` logic put the `require` statement before the `model calls` so we just need to invert the order so the `sever` use first the `models class` file instead of the `passport` file. When you fix this you can use the authentication flow then check `mongo DB atlas` to see if we got the `collection` create and a new record.

### Mongoose Queries

At this moment every time we make a `request` using the endpoint of the authentication process we store the user's `id` but if you notice if you do the process with the same user more than once you gonna store the same `id` on different `records` so to not have this issue we gonna do a `query` into the database to search if there is a `record` with that id.

To do a `query` we gonna use the same `User` constant that we create before and use a function call `findOne` that will check and return a user with that `id`.

```js
User.findOne({ googleId: profile.id });
```

Something to notices is that every time we reach to our `mongo` database in any way(like search, edit, save or delete a `record`) we are initiating an `asynchronous` action so the statement that we see before returning a `promise`(a tool that we use on `js` to handle `asynchronous` code) and we need to get a signal that the statement is ready for now we use a `then`(we gonna refactor it later).

```js
User.findOne({ googleId: profile.id }).then((existingUser) => {
  if (existingUser) {
  } else {
    new User({
      googleId: profile.id,
    }).save();
  }
});
```

Now introducing the `save` logic we prevent having multiples `records` with the same `id`.

### Passport callback

Since we now have the ability to store or search if the user exists we need to tell `passport` and the `strategy` that we are `done` with the authentication process for this we use a function that we receive in the `callback` that runs when we get the user profile call `done`. When you call `done` you need to send 2 arguments; the first one is the `error` object that tell `passport` that something fails on the authentication process(Is everything is fine you can send `null` for this object) then the second argument is the `user` that we just found or created.

```js
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientIID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
```

Since the `save` process is an asynchronous task we need to use `then` to get the `user` that we just created.

### Encoding Users

At this point we can trigger the authentication process; process the profile that we get and tell `passport` that you are done with the process but we still need some `unique` identifier for the user's browser that will be in every follow up request that the user do. For this we gonne set a cookie that the server will send to the client. To preform the task of create the cookie we need first to create that `unique` identifier and `passport` will help us with that; defining a `serializeUser` function and finally `passport` will add this `unique` identifier into the cookie for us.

To define this `serializeUser` function we use de `passport` object that we `require` before an call a function using the same serialize name.

```js
passport.serializeUser((user, done) => {});
```

`passport.serializeUser` recive a function with 2 arguments

- `user`: Is our `user model` and the same `model` that we retrive from the database and send it to the `done` function in the `callback` that `passport` do after we successfully have the user's profile
- `done`: Is a callback function that we need to call every time we finish some task using `passport` that recive an `error` object(`null` if everything is fine) and a peice of information relate with the task that we preforme.

Now we need to send this `unique` piece of information so `passport` can create the cookie for use.

```js
passport.serializeUser((user, done) => {
  done(null, user.id);
});
```

We just need to send as a second parameter the `unique` piace of information in the `done` function. There is something that may be confusing; we are not sending the `Google id` as a second parameter of the `done` function we are sending the `mongo id` of the `record`(`Mongo DB` autogenerate and `_id` for every `record` when is created) because if in the future we want to add different `strategies` to authenticate we can't ensure that all of then have an `Google id` but we allways have the `id` of the `record`.

### Deserialize user

Now we need to make a function that gives users the ability to convert the information of the cookie to a user. To do this we just use the `deserializeUser` function of `passport`.

```js
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
```

Like the previous serialize function `deserializeUser` receive a function with 2 arguments:

- `id`: Is the `id` that we send on the `serializeUser` function.
- `done`: This is a callback function that we need to call every time we finish some task using `passport` that receives an `error` object(`null` if everything is fine) and a piece of information relate with the task that we perform.

On that function we need to convert the `id` that we receive into a `model user` and that is what we send to the `done` function.

### Enabling cookies

Out of the box `express` doesn't now how to handle cookies so we gonna install a module call `cookie-session` to manage cookies on out application. To do this on the `server` directory on your terminal use the following command:
`npm install --save cookie-session`

Now `require` the `cookie-session` and `passport` modules on the `index.js` file.

```js
const cookieSession = require("cookie-session");
const passport = require("passport");
```

Why `passport`? is beacuase we need to tell `passport` that keep track of the `session` of the user and need to do it using cookies.

At this moment we begin to use those modules; first with `express`. We need to add the following `express` function passing the `cookieSession` object with a configuration.

```js
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
```

- `maxAge`: Is the time the cookie exist on the browser before is automaclly expire. Recive a time in milliseconds.
  For the example we use 30 days: `30 days * 24 hours in a day * 60 minutes on a hour * 60 seconds in a minute * 1000 milliseconds in one second`.
- `keys`: Key use to encript the cookie and can be any ramdon set of characters. The `keys` property as you notice recive an `array` that can recive multiple set of characters and ramdon pick one to encript every cookie.

Finally we need to tell `passport` to use cookies to handle authentication. We add the following code:

```js
app.use(passport.initialize());
app.use(passport.session());
```

In the last title of this section we gonna have a more deep view of this process.

### Testing authentication

At this moment we complete a process to have cookies and that is added to the `request` object that we use on our `route handlers` so this means that you can build a `route handler` and should have the user information on the request.

We separate our `routes` in a file called `authRoutes.js` and build an example `route handler` to test that handles the `/api/current_user` endpoint.

```js
const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
```

Know go to the `/auth/google` endpoint on your browser and begin the process(We still don't handle what we see after authenticate) then go to the `/api/current_user` and you should see the `user` information.

### Logout users

To logout users `passport` attach a `logout` function to the `request` object that we recive on the `route handler`. For this example we use the `/api/logout` endpoint.

```js
app.get("/api/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});
```

Know each time you reach that endpoint `passport` will delete the information of the cookie and the user will consider to be `logout`.

### A deeper dive

As we mention before we gonna have a deeper look at some of the topics that we did and don't explain too much in some of the previews titles.

#### Middleware

On the `index.js` at this moment we have 3 `app.use` calls and give then 3 different objects to then. These calls are referred to as a `middleware` that are small functions that can be used to modify any incoming `request` that came to our app before that they get to our `route handlers`. An example on this application is when an authenticated user sends a `request` to our app; that `request` will pass by 3 `middleware`(The `cookie-session`, `passport.initialize` and `passport.session`) that will make some minor adjustments to the incoming `request`. Here is the process that we follow on the example:

- First the `cookie.session` will extract the cookie data
- The `passport` functions will pull the user `id` out of the cookie data
- `desirializeUser` turn that user `id` into a user
- The information that we need is added to the `req` object as `req.user`

### cookieSession

Like we mentioned before the `cookieSession` extract the data of a cookie and added to the `req` object wit a property call `session` like this `req.session`. Internally `passport` doesn't check the actual cookie it checks the `req.session` that was added then pull the data out of there. So if you send the `req.session` on the `/api/current_user` you will see an object like this:

```
passport: {
  user: "the_user_id"
}
```

And the `id` is what was we store on the cookie and the one that we are gonna use to retrieve the user data with the `desirializeUser` function.

### cookie-session vs express-session

If you check the `express` documentation you will see that they recommend different libraries to manage cookies or sessions that are `cookie-session`(the library that we are using) and `express-session`.

As we mention before `cookie-session` we can assign an amount of data in a cookie then take the cookie data an assign it to the `req.session` property. So the cookie is the `session` and has all the data related to the current `session`.

The `express-session` library handle the `session` differently; it stores a reference to a `session` inside the cookie and then takes that `session id` from the cookie and look up all the relevant information from `session store`(some database of service that store the relevant data of a `session`). For example:

```js
        cookie             MongoDB
|| session_id = 123|| ==> || 123 || ==> || { userid: 123, username: 'test' }  ||
                          || 456 || ==> || { userid: 555, username: 'test1' } ||
                          || 788 || ==> || { userid: 10, username: 'test3' }  ||
```

So the key difference between the 2 is how the key information that we want on the cookie is store. Also, another difference is that we can store as much data that we want on the `session store` because it is a database that we can set to store as much data as we want too but the `cookie-session` we are limited to 4 kb.

### Notes:

- You don't need to pass all the `request` to a `middleware` you can configure that some of them don't use it.
- The example object of the `cookieSession` is in terms of our application so you can get a different result on the object inside of the `passport` property.

## Section 5: Dev vs Prod eviroments

In this section, we are gonna `deploy` our code to `Heroku` once again but we need to do certain things to accomplish this. First, we need to understand that we gonna have 2 sets of databases and `google API`; one for each environment that we have(`dev` and `production`) so we can work freely when we are on the development phase and don't mess with the `production` data.

### Setup and configuration of MongoDB atlas for production

- Sing in on your `Mongo DB atlas` account
- On your `dashboard` at the left find your current project dropdown and click it(if you don't set any name should said `project 0`)
- Click the `new project` option
- Put the name of the new project(in this example we use `emaily-prod`)
- Click `next`
- Then click `create project`
- On the `cluster` section click at the `build cluster` button
- Choose your service provider and a location near you(In the case of this example we choose `aws` and `virginia`)
- Click on `create cluster`
- After finish creating the `cluster` click on the `connect` button
- Then click on the `Add a different IP Address` button
- On the `ip address` input type this: `0.0.0.0/0`
  In a real production app, you would typically have a static IP and a Fully Qualified Domain Name. In this case, we would whitelist only the static IP. You can read up on this more here:
  https://help.heroku.com/JS13Y78I/i-need-to-whitelist-heroku-d
- Click on the `Add IP Address` button
- Then add your `Mongo DB` user(as a recommendation use the `autogenerate secure password` button)
- Click on the `Create MongoDB User`
- Then click the `Choose a connection method` button
- Click on `Connect your Application`
- Copy the connection string

### Setup and configuration of google API for production

- Sing in on your account in https://console.cloud.google.com
- On your dashboard at the top in the left click on your current project dropdown
- Click on `create project`
- Add the name of the project and click `create`(for the example we use `emaily-prod`)
- Wait until the creation process finish
- Then go to the top left corner and click on the `hamburger` menu
- Click the option `API & Services`
- On the submenu click on the `OAuth consent screen`
- In the left side menu choose `OAuth consent screen`
- Check the `External` option
- Click on `CREATE`
- Fill the `Application name`(put the same that you use before and you can pass sometimes fill the others inputs since is for production)
- Scroll to the button and click `Save`
- On the left side, menu click on the `Credentials` option
- Click on `CREATE CREDENTIALS` at the top of the `credentials` page
- Select `OAuth client ID`
- On the `Application type`, options check the `Web application`
- Go to your terminal on the root of your project
- Use the `heroku open` command
- Copy the app URL that `Heroku` create
- Scroll to the `Authorized JavaScript Origins` an put your authorize URL, in this case, your `Heroku` url without a `/` in the end.
- Scroll to `Authorized redirect URI` and put the `Heroku` URL with the `callback` endpoint that we define before
  `http://herouku.your.url/auth/google/callback`
- Click on the `Create` button
- Copy your `client id` and `client secret`

### Changing the keys.js file

Know we need 2 sets of credentials for our application one for `development` and one for `production` so we need to make some changes to our `keys.js`(To this moment we didn't commit this file).

First, we need to take on the consideration that `Heroku` use a `environment variable` that can help us to now on witch environment we are; that is called `NODE_ENV` and should be equal to `production` on the `Heroku` servers.

Know we are creating 2 new files on the `config` directory one is call `dev.js` and the other one is called `prod.js`. On `dev` we will add the current content of the `key.js` that is an object with all the credentials of our app.

```js
module.exports = {
  googleClientID: `your_cliend_id`,
  googleClientSecret: `your_client_secret`,
  mongoURI: "your_mongo_conection_string",
  cookieKey: "your_random_string",
};
```

And on the `prod.js` we will add the same object but instead of adding the cofiguration we will use `heroku's enviroment variables` that we are gonna create after set these credentials files.

```js
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
};
```

Know we gonna update the `key.js` file to choose one of the previews to define files depending on the environment

```js
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
```

Now we need to commit the `key.js` file and the `prod.js` file that will be needed when we deploy our app to `Heroku`. The `dev.js` file will be `ignore`.

### Set enviroment variables on Heroku

To set the `enviroment variables` that we use on the `prod.js` file just need to follow the next steps:

- Sing in to your `Heroku` account
- Choose the app that you create for this example
- Choose the `setting` option at the top
- Search for the `Config Vars` section
- Click on the `Reveal Config Vars` button
- Add the names that you add on the `prod.js` and the values that they gonna have. For example `process.env.GOOGLE_CLIENT_ID` => `GOOGLE_CLIENT_ID`
- Click `add`

Know you can deploy the changes that we have since the last time we deploy our app using the same [steps](https://github.com/oscarpolanco/node_react_fullstack/tree/master/sections_text#verifying-heroku-deployment) that we mention before.

### Fixing proxy issue

At this moment you should realize that we got a `mismatch URL` error when we try to do the authentication process on our app in the `Heroku` server. If you look the error closely you will notice that is redirected to the correct URL but use `HTTP` regardless you set `https` on the configuration that you previously did for your production `google api` so in some part of the process something affects the URL and change it. This error happened for the combination of 2 factors that combine cause the issue:

- The first factor is the `GoogleStrategy` that we use. Inside of the `GoogleStrategy` configuration object that we send there is a `callbackUrl` property that has a relative path; so the fact that is a relative path is one of the issues. When we send a relative path to give us more flexibility when we are on the development phase or deploying to production because we actually don't worry about the different domains between environments. The `GoogleStrategy` actually is set to handle this type of cases but the second factor is the reason why the `GoogleStrategy` is changing the URL.

- The second factor is `Heroku proxy`. When we deploy an app to `Heroku` is running into `Heroku's` network and our app is store in some `server` that `Heroku` set to us in some far place so to make sure that the traffic goes to the correct `server` all the traffic need to pass a `Heroku proxy` in it internal network. So the `GoogleStrategy` detects that any request came from a proxy it will don't trust any request that came from a proxy so it will not use `https`.

Understanding this we got 2 possible solutions:

- Set a `proxy` property to be `true` on the `GoogleStrategy` configuration object
- Put the complete URL on the `callbackURL` propety on the `GoogleStrategy` configuration object

In our case since we trust the proxy, we gonna up to the first solution. Once you update the code with your solution; commit your changes and deploy the app to `Heroku`.

## Section 6: Moving to the Client side

For the `client` side of our application, we are gonna use `create-react-app` that will help us to generate a project with a lot of pre-build configuration and tools that will help us. To install it and generate a project you just need to follow these steps:

- On your terminal globally install `create-react-app`: `npm install -g create-react-app`
- Then go to the `server` directory and generate a project with the name `client`: `npx create-react-app client`

Now inside of the `server` directory, you will notice that you got a lot of files that are a functional `react` application with a built-in `server`. To start your `react` app `server` you just need to go to the `client` directory and type the `start` command: `npm start`.

Now is a little confusing that we got 2 `servers` for our application but they are meant to have a different task? One of the `servers` is the one that we been building that handles the authentication logic(On the future we gonna add more) and the other one y from our `client` side that will take all the `components` that we build create a bundle and send it to the browser using `babel` and `webpack` so we will have a `server` that send all our frontend of our application and the other one that serves data.

### Running the Client and Server

To do this we are gonna use a module called `concurrently` that will allow us to run the 2 commands that start both servers in parallel.

- On the `server` directory install the `conurrently` module using: `npm install --save concurrently`
- Go to the `packege.json` on the `server` directory
- On the `script` section add a `client` script: `"client": "npm run start --prefix client"`
  With the `prefix` you can specify where is the command you gonna run in this case the client `package.json`
- Change the `dev` script name for `server`: `"server": "nodemon index.js",`
- Now add a new `dev` script to run both servers and user `concurrently`: `"dev": "concurrently \"npm run server\" \"npm run client\""`
- Now run both server on your terminal

### Routing Stumbling block

Now that we have the `client` part we can begin work with the other piece of the authentication that we still missing which is the trigger of the process by the user. For this process, for now, we will add a link that has that target the URL that we set before on our `express` server to trigger the authentication process(`/auth/google`).

- Go to the `client/src` directory
- Open the `App.js` file
- Inside of the `header` tag add a link like this:
  `<a href="/auth/google">Sing In with Google</a>`

Now that we have the link you will notice that we use a relative path so by default the browser will add your current URL that you are at that moment in this case `http://localhost:3000/` but our `express` server runs at the port `5000` so this means that we can't trigger the authentication process. We can write the correct URL in the `href` of the `anchor` tag but we will deploy our app to `Heroku` later so the link will not work anymore so we need a way to use the relative path and continue working no matter witch environment you are in; for this purpose we gonna use a `proxy` in our `client` side.

To add a `proxy` on your `client` app just need to follow the next steps:

- On your terminal go to the `client` directory
- Install the `http-proxy-middleware` library using
  `npm install http-proxy-middleware`
- Now on your editor go to the `client/src` directory and create a file call `setupProxy.js`
- On the `setupProxy.js` file add the following block:

  ```js
  const { createProxyMiddleware } = require("http-proxy-middleware");
  module.exports = function (app) {
    app.use(
      ["/api", "/auth/google"],
      createProxyMiddleware({
        target: "http://localhost:5000",
      })
    );
  };
  ```

- Now run the servers again
- Click on the link
- Now you will redirect to the google page but we got a `mismatch` error(this is the proof that our `proxy` works)

### Fixing the mismatch error

- First, go to the page that shows the `mismatch` error
- Then copy the `console.developers` link that the error show
- On your dashboard make sure that you are on your `google API` for development
- Then on your `credentials` section
- Go to the `Authorized redirect URI` input
- Add the `http://localhost:3000/auth/google/callback`
- Click save
- Test the URL after the `google API` process for update the changes finish

### Flow of the server in the development mode

When we are running both `servers` of our application we spec the following:

- When we go to our browser and make a request to `http://localhost:3000/` we gonna target our `create-react-app` server.
- The `create-react-app` server will return a `bundle.js` file that contains all our development assets.
- Then anytime that our app needs data from our `express API` that request will go to the `create-react-app` server and with the help of the `proxy` that we configure; the request will we forward to our `Node/express API`.

### Flow of the server on production mode

On `production` is a little different because the `create-react-app` server doesn't exist because before we deploy our application we gonna `build` our `React` project. When you run `npm build` on the root of the `client` directory; `create-react-app` will take all the different `js` and `style` files in the `src` and `public` directories and run `webpack` and `babel` over those files a will create a final `build` of our project in a directory called `build`.

- Now on `Heroku`, we will only run the `Node/Express` server
- When someone comes to our application we automatically return the `HTML` and `js` that we create with the `build` process that we did on our `React` application.

So at that moment, we don't get the `proxy` that we configure for our `client` side to redirect the request to the `Node/Express` side because the `create-react-app` server doesn't exist but if you notice we are running the `Node/Express` server in the same domain that is our `client` side and since we use a relative path on the `anchor` that we use this will automatically send the request to the correct `handler`.

### Why this architecture

On other projects you will find a different architecture like having to servers; one for our frontend and the other for our backend; that's completely acceptable but for this example, we wanna keep the things easy and we skip configuration that we should do with that other architecture. Also, we avoid 2 issues:

- We mentioned before that on our authentication flow we are gonna set some user's information on a cookie and that will be our session but there is an issue; when a user makes a `request` to `http://localhost:3000/` the cookie will automatically add to the `request` but is you need some kind of data from our `node/express` API and do a `request` to `http://localhost:5000/` by default the browser will not add the cookie information on the `request` for security reason. Imagine that you are in `http://localhost:3000/` and make a `request` to `http://localhost:5000/`; the browser is gonna be suspicious on why you from a domain is trying to access to a completely different domain and will think that maybe some malicious script redirect you to that domain so eliminate all the sensitive information of the cookie. This behavior is by default so there are ways to handle this for example on `development` we use a `proxy` on the `create-react-app` server.

- Another security feature of the browser when you try to access to a different domain from other it will be considered a `CORS` request(`Cross Origin Resources Sharing`); this means that by default the browser assumes that you are intending something malicious if you try to access a different domain from your current one. This is another feature that we can do a way around.

### Authentication process using the proxy

- Let's assume that the user is in `http://localhost:3000/`
- The user clicks on the authentication link in the client(`/auth/google`)
- The browser sees that is a relative path and prepend `http://localhost:3000/` so now we will have `http://localhost:3000/auth/google`
- The `request` go to the `create-react-app` server and the `proxy` that is inside of it
- Immediately the `proxy` check his configuration and see if it got any settings on that route and in our case the answer is yes
- Since the `proxy` is responsible for that incoming `request` it will tell the browser that sits the `request` to figure out what will do
- The `proxy` copy the entire incoming `request`
- Then send that copy to the route that we specify on the configuration in this case `http://localhost:5000/auth/google`
- Now the request is handled by our `node/express` server
- The server sees that the user is trying to authenticate so to continue you will need to go to the `google` servers and here is your callback URL(`/auth/google/callback`) so create that `response` send it to the `proxy`
- The `proxy` send the response to the pending `request` that send it back to the browser
- The browser gets redirected to the `google` servers
- The user gives authorization on the google screen
- Them the user is redirected to the callback URL that is `/auth/google/callback` since we specify a relative path the URL will be `http://localhost:3000/auth/google/callback?code=the_code`
- That callback `request` is sent back to the `create-react-app` server and the `proxy`
- The `proxy` will check his configuration to see if he can handle that `request` and on our case, it can; no matter that has `callback?code=the_code`
- Copy the incoming `request`
- Send it to the `node/express` server
- The server takes the code and turns into a profile information
- Create a cookie and send that response to the `proxy`
- The `proxy` send take the pending `request` and response to the browser

## Section 7: Developing the client side

### Refactoring with async/await

As we mention before we gonna refactor some of the `promises` that we use before to use the `async/await` keyword. Here is the first one on the `passport.js` file.

```js
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id,
      }).save();
      done(null, user);
    }
  )
);
```

### Client React Setup

Now we gonna begin to work on the client-side of our application. Here are the first steps that we gonna follow:

- Go to the `client/src` directory
- Delete all files except `serviceWorker.js` and `setupProxy.js`
- On your terminal go to the `client` directory
- Now install the `redux`, `react-redux` and `react-router-dom` using:
  `npm install --save redux react-redux react-router-dom`
- On your editor go to the `client/src` directory
- Create a file called `index.js`
- Import `react` and `react-dom`

  ```js
  import React from "react";
  import ReactDOM from "react-dom";
  ```

- Go to the `client/src` directory
- Create a new folder call `components`
- On the `components` folder create a file call `App.js`
- On the `App.js` file import `react`
  `import React from "react";`
- Now create an `App` function that returns some content like this

  ```js
  const App = () => {
    return <div>Hi there!</div>;
  };
  ```

- Export that function
  `export default App;`
- Go to the `index.js` that you create before
- Import the `App` component
  `import App from "./components/App";`
- Now use `react-dom` to render the root component
  `ReactDOM.render(<App />, document.querySelector("#root"));`
- On your terminal go to the `server` directory
- Run both servers using `npm run dev`
- You should see the content of `App.js` on the browser

#### Notes:

- Escensaly we gonna have a root file and another one that is very close to be a root file:
  - `index.js`: This file is going to have the initial bootup logic of the `Redux` side of our application another way to see it is that it is gonna put together all the initial data layer considerations of our application.
  - `App.js`: Is going to be aware of the rendering of our application or the `React` layer of our application.

### Redux initial setup

At this point, we add `React`,`Redux`, and `React-Redux` to our client and we make the basic`React` set up so now we gonna continue with `Redux`.

First, a little bit of `Redux`; is a tool that is gonna help us to store the `state` of our application. On our app, we will have a `React` component that will call an`action creator` that returns an `action` then this`action` is sent to our `reducers` that will update the`state` on our `redux` store that will send back to the `React` component all that update`state`.

But how is this `Redux` logic will connect with our`React` side of our application? We will have a `Provider` tag that is a`React` component that is provided by the `react-redux` (This library purpose is that`React` and `Redux` work together nicely) library on our`index.js` that is gonna wrap the components that we need that the `state` is available.

Here are the steps for the basic septup of `Redux`:

- Import `Provider` from`react-redux`
    `import {Provider} from" react-redux ";`
- Import `createStore` and`applyMiddleware` from `redux`
    `import {createStore, applyMiddleware} from" redux ";`
- Use the `createStore` to create an intance of the`redux` store

`const store = createStore ()`

- The first argument of the `createStore` is all different reducer of our application (Since we don't have anything yet we will add a function)
      `const store = createStore (() => [],);`

- The second argument is a inital state of our appliication (Since we are not using server side rendering we don't care to much about this argument so we gonna send an empty object)
    `const store = createStore (() => [], {});`
- Finally we apply the `applyMiddleware`
    `const store = createStore (() => [], {}, applyMiddleware ());`
- Now on the `<App />` call and wrap it using the `Provider` tag
    `js ReactDOM.render ( <Provider}> <App /> </Provider>, document.querySelector ("# root") );`
- Send the `store` as a`prop` of `Provider`
    `js ReactDOM.render ( <Provider store = {store}> <App /> </Provider>, document.querySelector ("# root") );`
- Run the servers and test on the browser

### Creating the auth reducer

Now we gonna add our first `reducer` of our app at this time the `authReducer` that is gonna be responsible of records whether or not the user is logged in.

- First on the `client/src` directory create a folder call `reducers`
- Then inside of the `reducers` folder create a `index.js` file
- Then create a file call `authReducer.js`
- On the `authReducer.js` export this function:

  ```js
  export default function (state = {}, action) {
    switch (action.type) {
      default:
        return state;
    }
  }
  ```

  In this case, we gonna receive the state that initially will be `undefined` that is why we add an empty object as default param and action and put the default case that will be the same state that you received.

- Go to the `index.js` file in the `reducers` directory
- Import `combineReducers` from `redux`
  `import { combineReducers } from "redux";`
- Import the `authReducer` file
  `import authReducer from "./authReducer";`
- Export the `combineReducer` with an object that has a property equals to the `authReducer`

  ```js
  export default combineReducers({
    auth: authReducer,
  });
  ```

  An important aspect of the object that we send to the `combineReducers` is that the `keys` that we provide will be representing the `keys` that are on our `state` object so be careful naming this here.

### React router basic setup

We will have different pages and content that will be visible for the user this means that we will have different `routes` that will control what we see for this we will use `react-router`. Here are the steps for a basic setup

- On the `App.js` file; import `BrowserRouter` and `Route` from `react-router-dom`
  `import { BrowserRouter, Route } from "react-router-dom";`
  - `BrowserRouter`: Is the thing that tells `react-route` how to behave. It looks to the current URL then changes the set of components that are visible on the screen any given time.
  - `Route`: Is a `React` component that is use to setup a rule betwen a certain `route` that the user visit inside of our application and a set of components that are visible on the screem.
- Create somo dummy components to test the `routes`
  ```js
  const Header = () => <h2>Header</h2>;
  const Dashboard = () => <h2>Dashboard</h2>;
  const SurveyNew = () => <h2>SurveyNew</h2>;
  const Landing = () => <h2>Landing</h2>;
  ```
- On of the `return` statement delete the current content
- Add the following code:
  ```js
  const App = () => {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  };
  ```
  - `BrowserRouter` spec that you have a least one child that is why we wrap the `routes` on a `div`
  - On the `Route` component we send the `path` and the `component` that will be show when we have a url that match with the `path`
  - Since `Route` send all component that have a match on the path we need to add `exact` on `/` because that `path` will match with every pattern that we choose on other `routes`(Same case in the `surveys`)
  - The `Route` components are tread as special child that `react-router` need to evalue to decide what to show on the screen. This allow us to put other components on the same container an won't be affected by `react-router` like the `Header` component
- Run your `servers`
- You will see the `Header` component content with the current `Route` content

### Header Component

We will have a `header` that is visible on all the pages and the content of that `header` will change depending on if the user is log or not. Here is the first step to creating the `header`

- On your editor create a file on the `component` diirectory call `Header.js`
- Inside of the `Header.js` import `React` and `Component` from `react`
  `import React, { Component } from "react";`
- Create a class base component
  ```js
  class Header extends Component {
    render() {
      return <div>Header</div>;
    }
  }
  ```
- Export the component
  `export default Header;`
- On the `App.js` file import the `Header` component
  `import Header from "./Header";`
- Delete the `Header` function that we create early
- Run the `servers`
- You should see the same content as before
- Stop your `servers`
- On your terminal go to the `client` directory
- Install `materialize-css`
  `npm install --save materialize-css`
- On your editor go to the `index.js` file on the `client/src` directory
- Import the `materialize-css` file
  `import "materialize-css/dist/css/materialize.min.css";`
- Go to the `Header.js` file
- Update the content of the component like this
  ```js
  class Header extends Component {
    render() {
      return (
        <div>
          <nav>
            <div className="nav-wrapper">
              <a className="left brand-logo">Emaily</a>
              <ul className="right">
                <li>
                  <a>Login with Google</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }
  ```
- Go to the `App.js` file
- Add on the top `div` that have the `Header` and all the `Route` components a `ClassName` of `container`
- Test on your browser and you should see a `header` with some style

#### Notes

- We will change the structure of the component on the future
- We will use `materialize-css` for the style of our components because is easy for us to override and add new style to this library
- When you create a project using `react-create-app` came with a pre-configure `webpack`.

  `webapack` is what is called a `module loader` so this means that we can fit in a number of files and `webpack` automated concatenate together and arrange all these different files in such a way that it spits out one or very few outputs files.

- `webpack` also has what is called `loaders` that instruct `webpack` how to handle other types of files as well not only `js` files.
- When we import a none `js` file we should add the extension of that file
- When we use a relative path on the import `webpack` automatically assume that you are targeting a module installed on your `node_modules` directory
- `materialize-css` require you that at least one of the top-level elements that you use on your page have a class called `container`

### Handle authentication on the client

Now that we have a basic implementation of the `header` we will need to think if the user is login or not because depending on that we will choose which elements we will have on the `header`.

To now when the user is logged in on our application we will use an `endpoint` that we create when we work on the `server` side of our application that is `/api/current_user` that will return to cookie information as part of the `request`.

To use the `/api/current_user` we will have the following strategy using `Redux`:

- When our `React` application boot up we make sure that our `App` component will call an `action creator`
- This `action creator` will be responsible for making an `API request` to our backend asking wheater or not the user is login
  - Inside of this `action creator` we will use the `Axios` library to do a `request` to our backend API; specific a `get` request to `/api/current_user`
  - This `request` go to the `express API`
  - Then we going to have a `response` back containing the user if is log in
  - When we got the `response` back we going to use a library called `redux-thunk` to `dispatch` an `action` to all different `reducers` of our application
- When the `action` is `dispatch` is going to be sent to our `authReducer`
  - The `authReducer` will be responsible to look at that action
  - Then updating some internal flag that said that the user is login or not
- When we have that update `state` we will change the content of the `Header`

#### Creating our action creator

- On your terminal go to the `client` directory
- Install `axios` and `redux-thunk`
  `npm install --save axios redux-thunk`
- On your editor go to the `index.js` file in the `client` directory
- Import the `redux-thunk` library
  `import reduxThunk from "redux-thunk";`
- Send `reduxThunk` as a parameter of the `applyMiddleware`
  `const store = createStore(reducers, {}, applyMiddleware(reduxThunk));`
- On the `src` directory create a folder call `actions` for our `actions creators`
- Inside of the `actions` directory create a file call `index.js`
- Import the `axios` library on the `index.js` file
  `import axios from "axios";`
- Now create a folder call `types.js` inside of the `actions` directory
- Inside of the `type.js` file `export` the `type` of our action
  `export const FETCH_USERS = "fetch_user";`
- Then inside of the `index.js` file in the `actions` directory import the `type`
  `import { FETCH_USERS } from "./types";`
- Now create a function call `fetchUser`
- Inside of the function user the `axios.get` function sending the `/api/current_user` as a parameter

  ```js
  const fetchUser = () => {
    axios.get("/api/current_user");
  };
  ```

- Now we gonna use the advantage of `redux-thunk` and return a function on our action creator to dispatch the action(To see more on `redux-thunk` go to the `notes` of this section)

  ```js
  export const fetchUser = () => {
    return function (dispatch) {
      axios.get("/api/current_user").then((res) =>
        dispatch({
          type: FETCH_USERS,
          payload: res,
        })
      );
    };
  };
  ```

##### Notes

- As you see we use a relative path when we use `Axios` this may have issues because you `dev` server is on a different domain than the `express` server so you will need to add a `proxy` as we did before. If you notice we add `/api` on the `setupProxy` file that we create before; this will take all the `request` that contains the `/api` and forward to the `express` server.

- The purpose of an `action creator` is to return an `action` that gets send to all different reducers of our application. `Redux` without with only the basic configuration spect that an `action creator` immediately returns an action but at this point of the example, we are adding `redux-thunk` that its only purpose is tho allow us to create `actions creators` that not immediately returns an `action`. With this ability, we now have that the `action creator` produce an `action` and pass it to a `dispatch` function. `Redux` by default when you create an `action` has a `dispatch` function to send that newly created `action` to the different `reducers` but you don't have access to it but with `redux-thunk` we will have access to it.

When we add the `redux-thunk` as a `middleware` on our `index.js` file it is going to inspect our `action creator` and if it returns a function instead of a normal `action` it will automatically run that function and pass a `dispatch` function as an argument and when you call the `dispatch` function you will send the `action` to all of our `reducers`.

### Make available our action creator to the components

We want to run our `action creator` when the application boots up so we need a place to add it that makes available to all the components that will need that `action` and the place is the `App.js` file but we need to do a little refactoring.

- On your editor go to the `App.js` file
- At the top import `Component` from `react`
  `import React, { Component } from "react";`
- Then refactor the `App` function to be a component like this

  ```js
  class App extends Component {
    componentDidMount() {}

    render() {
      return (
        <div className="container">
          <BrowserRouter>
            <div>
              <Header />
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/surveys/new" component={SurveyNew} />
            </div>
          </BrowserRouter>
        </div>
      );
    }
  }
  ```

- Now import `connect` from `react-redux`
  `import { connect } from "react-redux";`
- Also, import our `Action creator`
  `import * as actions from "../actions";`
- On the export statement of the `App` component use the connect function
  `export default connect(null, actions)(App);`
  - The first argument of the connect function is the `map state` prop; that we are not gonna use on this component that is why we send null
  - The second argument is all the `action creators` that we wanna use
  - All the `actions creators` are assing to the `App` component as props
- Now on the `componentDidMount` call the `fetchUser`

  ```js
  componentDidMount() {
    this.props.fetchUser();
  }
  ```

- Now for testing purposes go to the `authReducer` file on the `reducers` directory a put a `console.log(action)` before the `switch`
- Then on your console go to the `server` directory and run the servers
- Use the inspector console and check the logs
- You will see at least 4 logs; one for each `action` that comes to our `reducer`. The first 3 are part of the `redux` boot-up process and the other is our `action`
- Inside on the `object` that we see with the `type: fetch_user` on the `payload` property you will have the `Axios` response `object` that has a property `data` that is empty is the user is logout otherwise will have the same information that we see before on the `api/current_user` endpoint.

#### Notes

- Since we need to trigger the `action creator` when the app boots up; why `componentDidMount` instead of `componentWillMonut`? is because `componentWillMonut` will be called several times and we don't want this behavior for our `action`; the preferred place for calls like this is the `componentDidMount`.
- `Redux` was built to work without `React` that is why we need the `react-redux` library to work with `React` in particular the `connect` function to give the ability to certain components to call `action creators`.

### Refactor the action creator

Just add the `async/await` sintax for this.

```js
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};
```

### AuthReducer returns values

Now that we have our `action creator` set; we need to pick up the `action` to our `authReducer` but first we need to be sure that the payload is what we need on the `authReducer` because at this moment we are sending as a `payload` the `Axios` response but we only care about the `data` property of the object. On the `fetchUser` function at the object that we send on the `dispatch` function on the `payload` property add `res.data`.

First is important that we think first about the `life cycle` of our `reducer` and some of the different values that it will produce.

We are gonna use the `header` as an example. The `header` will show different elements depending on if the user is logged in or not. At this moment when our application boots up, we will do a `request` to see if the user is logged in but imagine that this user has a bad network and the request takes to a long time is this happen we will have some unexpected behavior on the `header`; for example, is we set as a default behavior that the link `Login with Google` is shown when we have the `request` issue we will see the link but will change when we get a response if the user is in fact log in. So to work this situation we gonna have the following:

- Make the request to the backend to get the current user and the request doesn't instantly; while this is happening our `reducer` should return `null` that will mean to us that we are not sure if the user is logged in.
- If the request is complete, the user is logged in; the `reducer` will return the entire `user model`.
- If the request is done, the user is not logged in; we return the value of false.

Now we go to do some changes in the `authReducer`:

- First import our `FETCH_USER` type
  `import { FETCH_USERS } from "../actions/types";`
- As a default `state` value we gonna set null(This will the value if we are not sure if the user is logged in)
  `export default function (state = null, action)`
- Then add a case on the `switch` for our `FETCH_USERS`

  ```js
  switch (action.type) {
    case FETCH_USERS:
    default:
      return state;
  }
  ```

- Now returns the `payload` or `false` to target the other 2 cases that we mention before(Since the `payload` will be an empty `string` we can use a `or` statement to send the correct value)

  ```js
  switch (action.type) {
    case FETCH_USERS:
      return action.payload || false;
    default:
      return state;
  }
  ```

- Delete the `console.log`

### Accessing the state in the header

Now we need to connect our `header` with the `redux store` to get the value of the `state` that we need in this case the `auth state`. For this we update the `Header` compoenent following the next steps:

- Connect the `Header` component with the `redux store` importing the `connect` function
  `import { connect } from "react-redux";`
- On the export statement add the `connect` function
  `export default connect()(Header);`
- Now create a function call `mapStateToProps`

  ```js
  function mapStateToProps({ auth }) {
    return { auth };
  }
  ```

  - The `mapStateToProps` will be call with the entire `state` object out of the `redux store`. We use `Es6` to extract only the part of the object that we need in this case `auth`
  - We need to return an object that is gonna be pass as a prop of the `Header` component. We use `Es6` to only have to put the `auth` parameter in the object so we don't have to tupe the same twice like this: `auth:auth`

- Send `mapStateToProps` as an argument on the `connect` function
  `export default connect(mapStateToProps)(Header);`
- Now at the before of the `render` function create another one call `renderContent`

  ```js
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a>Logout</a>
          </li>
        );
    }
  }
  ```

- Replace the `li` element with the `renderContent` function

  ```js
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a className="left brand-logo">Emaily</a>
            <ul className="right">{this.renderContent()}</ul>
          </div>
        </nav>
      </div>
    );
  }
  ```

- Now using the `server` side authentication process login and logout to test if the text on the `header` change

### Redirecting a user on auth

If you notice if you lunch the authentication process clicking on the `login` link that we just did after the user grant access to our application we got an error. This is because we need to set what the `route handler` that controls the `auth/google` endpoint should do after `passport` finish the authentication process. So we did a little update on our `handler` like you see next:

- First, on your editor go to the `server/routes` directory
- On the `authRoutes.js` search for the `/auth/google` route handler
- Send an extra parameter to the `route handler` that will be a function

  ```js
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {}
  );
  ```

- Use the `redirect` function of the `res` object; sending `/surveys` to send the user to the `dashboard` page after the authentication process is done

  ```js
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );
  ```

- Now on your terminal and run the `servers`
- Login using the link that we create and when you finish the process you will be redirected to the `dashboard` page

### Redirect on logout

Now we need to remember that the user is considered logged in when we have a cookie with some kind of information that we provide on the `server` side of our application so to `logout` we need to clean that cookie information to consider that the user is `logout` so we need to decide one of this 2 approach; make an `ajax` request or add a link that refreshes the page on `logout`

- Full `HTTP` request: The user clicks an `anchor` tag that will cause that the entire browser page to refresh to navigate to the `/api/logout` endpoint then the `server` will `logout` the user and redirect back to the client-side.

- Ajax request: When the user clicks a button we don't do any class of browser navigation or any `https` request to the `server` instead we can do a little ajax request to the `/api/logout` then the response of the `server` will tell the browser that clean the cookie but after that is up to us update the `redux` side of our application.

Between the two options, the first one is easier to implement but the other is much faster to the user because the browser is not changing `HTML` documents. All depends on the requirements of your application in our case we gonna up to the first approach because we don't have any requirement on this matter.

Now we gonna implement that approach:

- First go to the `Header` component on your editor
- Search `renderContent` and add `/api/logout` to the `logout` anchor
- Now go to the `authRoutes` file on the `server/routes` directory
- Search for the `/api/logout` handler
- Delete the `req.send(req.user)`
- Add `req.redirect('/')` to redirect on `logout`
- Go to your terminal and run the `servers`
- Test the `logout` process

### Landing component

Now we need to add a component for the `landing` page so we can begin to add elements that we need the user to see but at this moment we just put a basic content for the new component

- First go to the `components` directory
- Create a file call `Landing.js`
- Add a basic functional component like the following

  ```js
  import React from "react";

  const Landing = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Emaily!</h1>
        Collect feedback from your users
      </div>
    );
  };

  export default Landing;
  ```

- Now go to the `App.js` file
- Import the `landing` component
  `import Landing from "./Landing";`
- Delete the dummy `Landing` function that we create before

### Link Tag

Now we need one thing on the `header` that is the logo that needs to redirect to the `landing` page is the user is not logged in or to the `dashboard` otherwise. To do this we gonna use the `Link` component from `react-router-dom`.

To handle all the navigation inside of our application we gonna use the `Link` tag that will navigate all the routes that we define on our application but somethings like the `sign in with Google` link we need an `anchor` tag. The `Link` tag will navigate to a different route rendered by `react-router` and the `anchor` will navigate to a completely different `HTML` document.

- Now go to the `Header` component file
- Import `Link` form `react-router-dom`
  `import { Link } from "react-router-dom";`
- On the `render` function change the `Emayli` anchor tag for a `Link` tag

  ```js
  <Link className="left brand-logo">Emaily</Link>
  ```

- Add the `to` property with a ternary operator using the `auth` state to decide is the link is `/survey` or `/`

  ```js
  <Link to={this.props.auth ? "/surveys" : "/"} className="left brand-logo">
    Emaily
  </Link>
  ```

- Now test on the browser if the logo redirects to the correct page on `logged in` and `logout`

## Section 8: Handling Payments

In this section we will begin the process of charge for the `surveys` that a user is gonna create. So we will have and `Add credit card` button that will show a form on which we will submit our credit card information to gain a`credit` (1 dollar is 1 `credit`) that mean for each credit that you have you will have access to create a `survey` and send a bunch of emails that you need.

### Rules of Billing

Why we take this approach well here are some considerations on it:

#### We are bad at security

We got a deploy to `Heroku` but we don't spend second thinking on security maybe all is secure out of the box but the fact that we don't think on it is the proof that we don't always are thinking on security for this reason we have some tips to go around it.

- Never accept raw credit cards numbers (More on this later)

- Never store credit card numbers; for this we gonna use a third party API that will have all the billing infrastructure and all the web security around it.

- Always use an outside payment processor; on this project we gonna use [stripe](https://stripe.com/) that make take care of all the payment processes and the security around it.

#### Billing is hard

Even with a third party company that handles all this process that spends millions to make this process as easy as possible for us it will continue to be a hard process that requires a lot of thought.

- Possible to avoid monthly payment / multiple plans ?; Add complexity to all the process, for example, let's imagine that we set 2 plans; one with 10 surveys and the other with 50 surveys; a user buy the first one use 5 surveys but decided that he want the other now the user use the half of the surveys so how exactly we are gonna charge it. This means a more complex logic to get around all this type of situation.

- Fraud and chargeback are a pain; Accepting credit cards to your applications eventually you will have that at least one of your users send a fraudulent credit card or when a user get the built they decide that they actually don't want to pay for the service for some reason and will add more complexity to the process.

### Stripe billing process

- The user clicks on a button that we gonna add that reads `Add Credits`
- Then we tell `stripe` to generate a credit card form and show it to our user. When we are working with `stripe` we traditionally install a plugin author by `stripe` into our `React` application so everything we need to do the billing process we tell that plugin to generate and show the form that our users will use.
- When the user got the form it will enter the credit card detail
- Then all the information of the form will be taken by the `stripe` plugin and will send it to the `stripe` API
- After that `stripe` will send a `token` that will represent the pending charge. This will represent the authorization step that `stripe` have this mean that will allow your app to charge the user
- We take that `token` and send it to our API
- Our API will send a follow-up request with the `token` to the `stripe` API and confirm the charge was successful. This means that we put the charge that we need and send it with the `token` to complete the process
- And finally, we gonna add some `credits` to our user's account

### Adding the Stripe dependency

#### Create a stripe account

First, we need to create an account on the [stripe page](https://stripe.com/):

- Click on the `start now` button on the front page
- Fill the information of the form
- Click on the `create account` button
- For this example, you can `verify` your account but doesn't activate your account because you will need to fill a lot of information for production porpuses but for this example, we don't need it
- Your account will automatically view `test data`; this means that your account is on `test mode` and you will have the opportunity to send `test` data

#### Adding the checkout library and its configuration

After you got the account we need to install a module created by `stripe` that will be on charge of generating the form that the user will see and communicate with the `stripe` API but we are using `react-stripe-checkout` instead of the `checkout.js` because the second one assumes that you are using libraries such as `jQuery` or `Angular` and don't work out of the box with `React`

- Now on your terminal go to the `client` directory
- Install `react-stripe-checkout` using: `npm install --save react-stripe-checkout`
- Now we need to add the `keys` that we need on the project; first on the `server/config` directory go to the `dev.js` file and add the follwing:

```js
stripePublishableKey: "pk_test_my_public_key",
stripeSecretKey: "sk_test_my_secret_key"
```

To get those keys; go to your `stripe` dashboard and on the `API` section. Be careful with the `secret` because we don't want to share it with the public also be careful with the names on the config files because if we got a typo will see the error after we finish with the frontend of our application.

- Now got to the `prod.js` file in the `server/config` directory and add the following:

```js
stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
stripeSecretKey: process.env.STRIPE_SECRET_KEY
```

- Now go to the `Heroku` dashboard on the `setting` options
- On the `config vars` sections click on `Reveal config vars`
- Add the `STRIPE_PUBLISHABLE_KEY` and the `STRIPE_SECRET_KEY` with it values
- Now we need to add the `keys` on the `client` actually just the `public key`. On your editor go to the `client` directory
- Create a file called `.env.development` and add the following:
  `REACT_APP_STRIPE_KEY=pk_test_my_public_key`
- Now on the same directory create a file call `.env.production` and add the following:
  `REACT_APP_STRIPE_KEY=pk_test_my_public_key`
- Now run on your `index.js` file on the `client` directory log the key calling it like this:
  `process.env.REACT_APP_STRIPE_KEY`
- Run your `servers` again
- You should see the `key` on the console of your browser
- For this project we gonna `ignore` both `.env` file son on the `.gitignore` add both files

##### Notes:

- On the frontend of our application, we are using `Es6` modules and the backend are using common js modules to require files so this means on our backend we can have some amount of logic before the `require` statement(Like our `key.js` file) but on `Es6` does not allow any type of logic before an `import` statement that is one of the reasons that we don't use the same config file on the `client`.
- If we `import` the config file in our `client`; when we compile our project all the content of the file will be available to the public; that is another reason that we don't use our config file of the `server`.
- When you are setting an `environment variable` using `create_react_app` you need to add the `REACT_APP` as a prefix on your `environment variable` name.

### Payment component

Now that we got all the configuration that we need; we can use the `checkout` library. Now by default when you render the `stripe` module as a component it will render a button that the user can click and when is clicked the form will appear on the screen so we gonna first create a component that uses the `stripe` module and use it on the `header`.

- First, on your editor go to the `client/component` directory
- Create a file called `Payments.js`
- Import `React` and the `stripe checkout` modules

  ```js
  import React, { Component } from "react";
  import StripeCheckout from "react-stripe-checkout";
  ```

- Now create a class component that renders the `StripeCheckout` component and export it

  ```js
  class Payments extends Component {
    render() {
      debugger;
      return (
        <StripeCheckout
          name="Emaily"
          description="$5 for 5 emails credits"
          amount={500}
          token={(token) => console.log(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        />
      );
    }
  }

  export default Payments;
  ```

  - `name`: Is the title that will show the modal
  - `description`: Is a little description that will appear below the title to give a little context to the user of what is paying
  - `amount`: By default is on `US dollars` and the number that you put in there should be on `cents` so `500 cents` are `5 dollars`. For this example, we gonna stick with `dollars`
  - `token`: Receive a `callback` function that will run when we receive the `token` that the `stripe` API send us after the user fills the credit card information and submit it. For now, we just gonna log the `token` that we receive
  - `stripeKey`: The key that we previously get from the `stripe` dashboard

- Now go to the `Header` component
- Go to the `renderContent` function and update the `default` case(That means that the user is logged in)

  ```js
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }
  ```

- Now run your servers
- Log in
- You should have a button called `Pay with card`
- Click the button
- You should see a modal that you will use to send your credit card info to `stripe`
- Put a random `email` on the first input
- Add this number on the `credit card` input; `4242 4242 4242 4242`(Press `42` until the input is fill)
- Put an `expiration date` on the future
- Put a random `cvv` number
- Open your inspector
- Click on the `submit` button
- Check on your browser console the `token` that we receive from `stripe`(more on that object in the `notes` of this title)
- Now go back to the `Payments` component file
- Now add the closing tag so the `StripeCheckout` receive a child and send a button with a `className` call `btn`

  ```js
  <StripeCheckout
    name="Emaily"
    description="$5 for 5 emails credits"
    amount={500}
    token={(token) => console.log(token)}
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
  >
    <button className="btn">Add Credits</button>
  </StripeCheckout>
  ```

  This will use a class of `materialize-css` to style the button and change the default style and text of the button

#### Notes:

- Instead of a `token` we actually receive an object that represents the pending charge. The closer as a `token` that we have on that object is the `id` that we gonna use it on the follow-up request that we gonna do on our API
- We also have `client_ip` that can be used for some security libraries that will help us to reduce fraud(we don't gonna use it on the example)
- `created` is the `timestamp` where it was created
- `email` is the `email` that we send on the form
- `livemode` should be `false` because we are on `test` mode
- `type` is the type of payment in this case `card` because we use a credit card
- `card` object that has some information on the credit card that you just submitted

### Reusing Action type

Now that we receive a `token` from the `stripe` API we need to then send that to our API to do a follow-up request to complete the transaction and add the `credits` to our user. For this purpose, we gonna add a new field on the `user` model that we already have that contain the amount of `credits` that the user has this will allow users to use the same state that we already have and reuse some of the `action` logic that we already build for the authentication flow because each time we update the user model we will need to refresh the user information like we did when the user logs in.

Now we follow the next process:

- On your editor go to the `client/actions` directory
- On the index file add the following code:

  ```js
  export const handleToken = (token) => async (dispatch) => {
    const res = await axios.post("/api/stripe", token);

    dispatch({
      type: FETCH_USERS,
      payload: res.data,
    });
  };
  ```

  Since we are using and updating the user model to add the `credits` after the payment we can use the same `action type` of fetching the user and since we are using a `post` function we gonna receive a response that will contain the user information that we gonna use on the payload. The `endpoint` that we use is not yet created on our API.

- Now we need to go to the `Payment` component to use the `action`
- Import the `connect` function and the `actions`

  ```js
  import { connect } from "react-redux";
  import * as actions from "../actions";
  ```

- On the `export` statement use the connect function to make available the `actions` on the component
  `export default connect(null, actions)(Payments);`
- Now go to the `token` prop that the `StripeCheckout` receive and update the `callback` function to use the `action`

  ```js
  <StripeCheckout
    name="Emaily"
    description="$5 for 5 emails credits"
    amount={500}
    token={(token) => this.props.handleToken(token)}
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
  >
    <button className="btn">Add Credits</button>
  </StripeCheckout>
  ```

- Now test on your browser. You will receive a `404` error after you submit the example credit card information but that is expected since we don't create the `/api/stripe` yet

### Completing the stripe process on the backend

Now we need to create the `endpoint` that will use the `token` to complete the billing process.

- Go to the `server/routes` directory and create a file call `billingRoutes.js`
- Export a function that uses `app` as a parameter and handle a `post` for the `/api/stripe` endpoint

  ```js
  module.exports = (app) => {
    app.post("/api/stripe", (req, res) => {});
  };
  ```

- Go to the `index.js` file and bellow the `require` statment of the `authRoutes` add the following
  `require("./routes/billingRoutes")(app);`

- Now we need to install a `stripe` module for our backend that will help us to take the token that we got on the frontend and exchange it back to an actual charge of the user credit card. On your terminal go to the `server` directory and use the following command:
  `npm install stripe --save`

- Now at the top of the `billingRoutes.js` require the keys file
  `const keys = require("../config/keys");`

- Then require the `stripe` module sending the secret `stripe` key that we use before
  `const stripe = require("stripe")(keys.stripeSecretKey);`

- Now we need to resolve an issue before working with the `endpoint`. We made a `post` request to our backend containing all the information about the credit card but when you do a `post` request to an `express` server; `express` does not automatically parse the content of the `payload` of that request so we need to install a module that every time `express` receive a `post` request it should take the request `body` parse it and make it available to our application. For this, we gonna use the [body-parser](https://www.npmjs.com/package/body-parser) module.

On your terminal go to the server directory and install `body-parser`
`npm install --save body-parser`

- Now on your editor go to the `index.js` file in the server directory and require the `body-parse` module
  `const bodyParser = require("body-parser");`

- Now add the `body-parser` module as a `middleware`
  `app.use(bodyParser.json());`

  Now all the payload that you send to the `express` server will be available on `req.body` on our `route handler`.

- Now we need to use `stripe` to create the charge. On your editor go to the `billingRoutes` file and add the following code in the previous define `route handler`

  ```js
  app.post("/api/stripe", (req, res) => {
    stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });
  });
  ```

  - The `amount` property is the value on cents that we will charge and should be the same that we previosly define on the client side.
  - The `currency` property define the type of that currency; should be the same as the previous define on our client side of our application
  - the `description` property define a message of the charge
  - the `source` property specify what credit card or charge source that we wanna build and should be the `id` property that we get from the client side.

- Finally need to add the `async` keyword since the `create` function is asynchronous

  ```js
  app.post("/api/stripe", async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });

    console.log(charge);
  });
  ```

- Now do the charging process from the client and check the terminal; you should receive an object that represents the charge.

#### Notes

- [Here](https://stripe.com/docs/api) you can see the `stripe` module documentation
- In our case we wanna use the `stripe` module to create a [charge object](https://stripe.com/docs/api/charges/object); that object is returned to us by the `stripe` API.
- To get the `charge object` we need to [create a charge](https://stripe.com/docs/api/charges/create)
- One of the required properties on the configuration object is the `source` property that means what `credit card` or source of payment we are using; that will have the `token` that we get from the `checkout` library.
- On the `stripe` documentation you will see that they send a callback function as a second parameter but we actually don't need to send that callback function; as we see on the `stripe` npm documentation we can use promises to handle the result that is why we use the `async/await` keyword.

### Adding credits to a User

Now we need to convert that charge that we did to the user `credit card` or source of payment to a `credits` of our application. To do this we gonna add a new property to our `user` model class that represents the `credits` and by default have a value of `0`.

- Now first on your editor go to the `User.js` file on the `models` directory and add a `credits` property to our `schema` send an object as its value that will have the `type` and the `default` value.

  ```js
  const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 },
  });
  ```

- Now on the `billingRoutes` file; we need to get a reference to the current user model; in other words the user that made the request. As you remember that when we use `passport` and a `user` log in to our application we can access our current user model using `req.user`. With the current `user` model we can add the `5 credits` to the `user`.
  `req.user.credits += 5;`

- Now we need to add that change to our database so the information persists.
  `const user = await req.user.save();`

- Finally we `response` with the new updated user
  `res.send(user);`

- Now restart your server and do the billing process from the client.

- On the browser console in the network section; you should see the `stripe` request with the `user model` on its response.

#### Notes

- By convention, after we `save` the information of the database, we use the result of that function instead of the `req.user` to have the most possible update model on that point of time.

### Requiring authentication

We have a `route handler` that will add the `credits` when the user is a charge but as you see in the code we depend on `req.user` to complete the process; this means that the user must be logged in. If we try to access that `route handler` when we are not logged in the server will return an error so we need to handle this issue.

On your editor go to the `billingRoutes` file and add the following conditional block

```js
if (!req.user) {
  return res.status(401).send({ error: "You must log in!" });
}
```

This means that every time that the user doesn't exist on the request we gonna respond with unauthorize status and an error message.

This logic will be enough for our `route handler` but on this project, we will have some more `routes` that will need that logic and that will create a painful process of add this condition on each `route` that we need so we will need something that can help us with this and that is a little feature of the `express` world that we already see before call `middleware`. We can add some number of `middleware` that the request will past and they will be made some change to it but oppose as before we don't want that all the request past throw ur new `middleware` just some particulate `routes`. For this, we gonna follow these steps

- First, on the `server` directory we create a folder called `middleware` that will centralize all the `middleware` that we gonna create.
- Inside of the `middleware` directory create a file called `requireLogin.js`
- Inside of the new file export a function that receives 3 parameters: `req`; `res`; `next`
  `module.exports = (req, res, next) => {};`

  - `req`: The incoming request
  - `res`: response object
  - `next`: Is a function that is called when our `middleware` is complete and will pass the request to the next `middleware` on the change or to the correspondent route

- Now we add the condition that will help us to know is there is a `user`

  ```js
  module.exports = (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: "You must log in!" });
    }
  };
  ```

  We don't add the `next` function on the condition because we don't want that the request continues if we got some error.

- If there is a `user` on the request we add the `next` function to continue

  ```js
  module.exports = (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: "You must log in!" });
    }

    next();
  };
  ```

- At this moment; we need to add our new `middleware` to our particular `route`. Go to the `billingRoutes.js` file and export our new `middleware`
  `const requireLogin = require("../middlewares/requireLogin");`

- Finally, we need to add it to our `route handler`. After the `/api/stripe` you can put the name that you just export and delete the condition block that we add before.

  ```js
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
  ```

  Is worth to notice that we do not invoke the `middleware` function just add a reference to that function; with this, we tell `express` that do not call the function the very first time that load the code instead we need that every time it gets a `post` request to that particular `route` here is the reference to a function to run.

  Also, the request functions take an arbitrary number of parameters so you can add as much `middleware` as you want with the condition that one of the parameters eventually needs to process the request and send a response back to the user.

### Displaying the credits on the client

We already work almost all the things that we need to display the `credits` on the client-side of our application because we already have the user model available so we just need to call to display it.

On the `client/src` directory go to the `Header` component; specifically to the `renderContent` function an add the new `li` calling the `credits` property of the `auth` prop as it content after the `payment` element.

```js
default:
  return [
    <li key="1">
      <Payments />
    </li>,
    <li key="3" style={{ margin: "0 10px" }}>
      Credits: {this.props.auth.credits}
    </li>,
    <li key="2">
      <a href="/api/logout">Logout</a>
    </li>,
  ];
```

Since we use the global state of our application each time the user makes a new charge and adds some credits the header will automatically update.

## Section 9: Back end to front end routing in production

At this moment will be a good time to do deploy to production since we add a mayor architecture piece of our application with the `client` side. Previously we just made a deploy to production of our `express` server so we to take consideration some extra steps to preform the deploy; first, we need to remember how our application will work on development vs production.

On development mode when a browser gets for example to `http://localhost:3000/`; the browser is essentially saying that need some stuff of our `react` side of our application at that moment the `create-react-app` server will handle this request and send everything that the browser needs but on production this work different because the `create-react-app` server doesn't exist this means that when the browser makes get to the `Heroku app` URL the `express` server somehow respond with all the relevant assets.

For example, if the `express` server receives a `post` request to the `api/stripe` the server will understand that you are trying to send a `stripe` token and will process that request and respond but if the server receives a request to `/surveys` this is a `route` that we define on the `client` side of our application using `react-router` so we will have some `routes` handle by the `express` server and some other control by `react-router`. At this point, we need to make an assumption that every time the `express` server receives a request to a `route` that it does not know about it will probably control by `react-router` and it will return the `index.html` (created with the `create-react-app` build command) that inside of it have a `script` tag to load our `js bundle` (also created by the `create-react-app` build command) at that moment the browser will try to fetch the bundle file from the `express` server we need to instruct it again that if it doesn't recognize the `route` need to be forwarded to the correct file, in this case, the `main.js` bundle file at that moment the browser have access to the `index.html` file and the `js bundle` so this means that `react-router` that will see the current URL and decide to show the correct component in the example case `Dashboard`. With this example we now know that we will have 3 types of routes:

- The ones that the `express` server know about it and can process it like `/api/stripe`
- The ones that the `express` server doesn't know about it and return the `HTML` document like `/surveys`
- The ones that the `express` server doesn't know about it and return the actual file rather than the `HTML` document like `client/build/static/js/main.js`

### Routing in production

Now we need to add the logic that will allow our `express` server to handle the `routes` that it can't process on production.

- First, go to the `index.js` file at the root of the `server` directory

- Now at the bottom of the file after the `billingRoutes` require statement add a condition asking is the `NODE_ENV` is on production
  `if (process.env.NODE_ENV === "production") {}`

  As we mentioned before the `NODE_ENV` environment variable is automatically set by `Heroku`

- Inside of the condition block we gonna first serve up all the production assets like `main.js` and `maiin.css` files

  ```js
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }
  ```

  This line means that is the server receive a `get` request for some file or route that the server doesn't understand what it looking for then look for the `client/build` directory and try to see if there is a file that matches up with what the request is looking for.

- Now require a module called `path`

  ```js
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require("path");
  }
  ```

- Finally, we need to serve the `index.html` is doesn't match with any route or file even in the `client/build` directory. For this, we need to create a `route handler` that response with the `index.html` file

  ```js
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
  ```

  Is important to notice that we need to define the condition block like this because the order of operations is important so this last block will only run when `express` don't find on the `client/build` directory a file that needs to respond.

### Adding in a Heroku build step

We have a couple of options to do the build process for the production deploy like use a `CLI` but we gonna use `Heroku` since is the resource that we already set for the production environment and will be a little straight forward for us at the moment; the only downside is that we will need to install all the dev dependencies on the production to generate the `build` files and don't use it again.

#### Steps that we going to follow using Heroku

- We need to commit our files to `git`
- We going to push those files to `Heroku`
- When we push to `Heroku` it will automatically install all our server dependencies(This already happens on our previews deploys)
- After `Heroku` install all the `server` dependencies it will run a script called `heroku-postbuild`
- Inside on that script, we will tell `Heroku` that install all dependencies of our `client` side(including the `dev` dependencies)
- Then tell `Heroku` that run the `npm run build` command on our `client` side to create the `build` directory
- Then `Heroku` will continue to deploy our application as it did before

#### Set the script to build the client

First, [here](https://devcenter.heroku.com/articles/nodejs-support) is the `Heroku` documentation that will show you some options that you can add when you are using `Heroku` with `NodeJs` at this moment we gonna work with the [customizing the build process](https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process).

Now we need to be aware that we gonna use a more specific script for the build step instead of the standard [postinstall script](https://docs.npmjs.com/misc/scripts) script because of 2 things:

- The `postinstall` script will run every time we install our dependencies
- We need to run the script after install all the `client` dependencies after all the `server` dependencies are installed

Also as we mentioned before we will need to install all the `dev` dependencies of our `client` side but by default `Heroku` ignore those dependencies so we will need to set an environment variable called `NPM_CONFIG_PRODUCTION` and set it to `false` but is important to set this environment variable for the `client` side.

Finally, we will put this `heroku-postbuild` script on the `server package.json` because this is the file that `Heroku` will target automatically.

In the `package.json` on the `server` directory on the `scripts` property add the following line
`"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"`

- `NPM_CONFIG_PRODUCTION=false`: Will tell `Heroku` that install all dependencies include the `dev` dependencies
- `npm install --prefix client`: Command to install all dependencies on the client-side
- `&& npm run build --prefix client`: Afte the `install` command finish will run create the `build` directory that contains all our production assets

Now you can commit your changes to `git` and make a `push` to `Heroku`. You should see that the `client` side is on your production server.

## Section 10: Mongoose for survey creation

We are gonna continue with the next feature of our application that is the `survey` endpoint on our API in other words the ability of our user to create `surveys`, to send it out, and somehow receive feedback. Here is the flow of what is going to happen when the user creates a `survey`:

- The user creates a `survey` with a simple `yes/no` question (when we solicitude feedback we gonna ask just a `yes/no` question; is simple for the example)
- Then the `user` is going to send the `survey` to our backend API
- After that our backend API are gonna take all that `survey` information (like the title; the people to send it to and the question to ask) and is going to create a template out of it
- Then the `express` server is going to use 3rd party email provider to send a big email to all the people that should receive the `survey`
- When the `users` receive an email with the `survey` will click `yes/no` to respond to the `survey`
- Then the `email` provider will note the `user` respond
- At that moment the `email` provider will send a note to our `express` server with the respond of the `user` in a particular `survey`
- Finally, our `express` server is responsible to record the feedback in our `mongo` database

### Survey routes

- `GET /api/surveys`: When the user makes a request to this route will find all the `surveys` that the user-created and return back to them.

- `POST /api/surveys`: Handle the case of the `users` that want to create a new `survey` and have it to automatically email out to everyone they want. When a `user` makes this request we spec that it send this 4 pieces of data:

  - `title`: The title of the `survey` (name of the `survey` that the `user` will see on our application)
  - `subject`: The subject line that will be shown on the `email`
  - `body`: The text that will be shown on the `email`
  - `recipients`: The comma-separated list of email addresses to send a survey to

- `POST /api/surveys/webhooks`: Receive feedback from the `user` that receive an `email` and click the link on the `survey`.

### Survey model

The easiest part that we can begin in the `survey` process is the creation of the `survey` because the other 2 endpoints depends that a `survey` exist.

So to begin we need to work with the database to store the `surveys`; this means that we need to create a `model` that will create the records that we need but is the word to notice that we need some kind of connection between the `survey` class and the `user` class so we can relate with `user` create the `survey`.

Now on the `models` directory create a file call `Survey.js` and add the following:

- Require `mongoose`: `const mongoose = require("mongoose");`
- Get the `schema` from `mongoose`: `const { Schema } = mongoose;`
- Create a new `schema` with the propeties that we mention before that will represent our `survey`

  ```js
  const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [String],
  });
  ```

  Note that the `recipients` property will be an `array` of `strings` for the moment.

- Finally add the new `model` to the database using `monogoose`: `mongoose.model("survey", surveySchema);`
- Go to the `index.js` file on the root of the `server` directory and bellow the `user` model require statement; require the `survey` model: `require("./models/Survey");`

Looking at that `schema` that we just did we can say that we will have to deficiencies:

- The first one is a simple one; where do we store our `feedback`?. At this moment we don't have any way to update the record when a given `user` press `yes/no` on a `survey` and we won't able to know how many `yes/no` have been press by the `users` that you send the `email`. For this we gonna add 2 properties with the respective name of the option; in this case `yes/no`; that will store the count of the click of the options.

- Now imagine that a `user` press a lot of times one of the options; at this moment we don't have any record that tells us is a given `user` has already provided some amount of `feedback`; for this, we need to introduce some additional property that somehow record that some given `user` has summited some `feedback` but the issue on adding a new property is that we don't have much information of the `users` that receive the `surveys`; just the `recipients` have the list of the `emails` to send the `survey`. At this moment an `array` of `string` is not appropriate to store the information that we need so inside of our `recipients` properties we gonna embed a `subdocument collection` that will have a couple of little `models` call `recipients` with 2 properties; one call `email`(is the `email` of a given `user`) and the other call `clicked`(a `boolean` flag that represent that a given `user` click an option).

Now we can add the options of the `survey` on the `schema`. Go to the `Survey.js` file on the `models` directory and add the following:

```js
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [String],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
});
```

### Limitations of the subdocuments collections

As we mention before; at the instant that we create our `survey` model, we get a new `collection` on our `mongo` database that store a list of `surveys` and we refer to this as a `survey collection` so inside of the `survey collection` we got a bunch of different `instances/records` that represent a `survey` and we can store a variety of `records` inside of a `survey` that we call `subdocument collection`(in this case `recipients`). We use this `subdocument collections` when we want to make a very clear association between 2 given `records`(in our case a `recipient` will only belong to it parent `survey` and this `recipient` don't have any use for any other `survey`). Knowing this you may ask; why the `surveys` are not `subdocuments` of the `user`? And the reason is the physical limitations of `MongoDB`. In `MongoDB` we refer to each `record` inside of a `collection` as a `document` and we have limited sizes to each of them; that is `4mb` and we will limit the amount of `email` per `survey` to be less than the complete `4mb`.

### Setting up subDocs

Now we gonna add the `subdocument collection` to our `survey` collection.

- Insde of the `models` directory create a file call `Recipient.js`
- Inside of the `Recipient.js` file require `mongoose`: `const mongoose = require("mongoose");`
- Then pull of the `Schema` object from `mongoose`: `const { Schema } = mongoose;`
- Now create a `schema` for the `recipient` wit a property call `email` that is a `string` and a property call `responded` that is a `boolean` with a default of `false`

  ```js
  const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false },
  });
  ```

- Now exports the `recipientSchema`: `module.exports = recipientSchema;`
- Go to the `Survey.js` file and import the `recipientSchema`: `const RecipientSchema = require("./Recipient");`
- Finally update the `recipient` property in the `surveySchema` adding a value of a list of `RecipientSchema`

  ```js
  const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
  });
  ```

### Relathionship fiels

As we told before one user will have many `surveys` so we need to somehow identify which server belongs to which user so we need to add another property to make that relationship.

On the `survey` schema add a `_user` property

```js
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});
```

- `_user`: Reference to a particular `user`.
- `type: Schema.Types.ObjectId`: This will contain the `id` of the user that owns this record.
- `ref: "User"`: The reference that we do with the `id` belongs to the `user` collection.

Not related to the topic we also add 2 properties of `Date` with the information on when the `survey` is sent and when the last time someone responds.

```js
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
});
```

#### Note

- The underscore before `_user` is not obligatory but by convention, we use this for relationship files.

### Create the survey route handler

Now that we got our `survey` schema we can begin to work with the first of the `route handler` that will have all the `survey` logic that we need.

- First go to the `route` directory and create a file call `surveyRoutes.js`
- Now export a function that recive a parameter call `app`
  `module.exports = (app) => {};`
- Now go to the `index.js` file in the `server` directory
- Require the file that we created and imidialy call a as a function sending the `app` object
  `require("./routes/surveyRoutes")(app);`
- Now on the `surveyRoutes.js` use the `post` function of `app` to match the `/api/surveys` endpoint

  ```js
  module.exports = (app) => {
    app.post("/api/surveys", (req, res) => {});
  };
  ```

- We need to make sure that the `user` is logged in so we can use the `requireLogin` middleware that we create before; to do this first require the middleware.
  `const requireLogin = require("../middlewares/requireLogin");`
- Then we can add it as part of our `route handler`

  ```js
  const requireLogin = require("../middlewares/requireLogin");

  module.exports = (app) => {
    app.post("/api/surveys", requireLogin, (req, res) => {});
  };
  ```

- Now we need to make sure that the `user` has the minimum number of credits to continue with the `route handler` logic. For this go to the `middleware` directory and create a file called `requireCredits`
- Then export the following function that will have a condition that checks if the user has more than `0` credits and send a `403` status code if it doesn't have enough credits

  ```js
  module.exports = (req, res, next) => {
    if (req.credits < 1) {
      return res.status(403).send({ error: "Not enough credits" });
    }

    next();
  };
  ```

Why `403` status code? Because is the one that represents at this moment what we need; there is a [403](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.3) payment required status but is not implemented yet as you see in the [W3.org](https://www.w3.org/) documentation.

- With this you can add it on the `surveyRoutes` file. First require the new middleware
  `const requireCredits = require("../middlewares/requireCredits");`
- Add the `requireCredits` middleware on the `route handler`

  ```js
  module.exports = (app) => {
    app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {});
  };
  ```

Remember to put the middlewares on the order that you want to execute

### Creating surveys

Since we finish with the `route handler` creation we can start to add some logic to create and save a new `survey` on our database.

- Like we spoke before we spec that the body of the request has some properties that will be used, in this case, to create the `survey` so we can begin with this on our `route handler`

  ```js
  module.exports = (app) => {
    app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
      const { title, subject, body, recipients } = req.body;
  };
  ```

We use destructuring to get all the properties that we need from the request body

- Now we need `mongoose survey model` that we create before to create a new instance of a `survey` so you will need first to require `mongoose`
  `const mongoose = require("mongoose");`
- Then you will need to create a constant to get access to the `survey` model
  `const Survey = mongoose.model("surveys");`
- Now create a new instance of a `survey` adding the properties that you need

  ```js
  module.exports = (app) => {
    app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
        title,
        subject,
        body,
      });
    });
  };
  ```

  As you may notice there are some missing properties of the `survey` but we separate those on its own steps because they need some more logic previews one

- Now we can add the `recipients` property. On the body of the `request` we gonna receive an array of `emails`(strings) and we need to convert it on an array of `object` because this is how we define our `recipients` subdocument before so we are going to `split` by a `comma` the array and `map` throw every item and eliminating the `space` of every item that will form the new object as you see next

  ```js
  module.exports = (app) => {
    app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(",").map((email) => ({
          email: email.trim(),
        })),
      });
    });
  };
  ```

  If you remember we got a `responded` property on our `Recipient` subdocument but is automatically set to `false` every time we create a new `recipient` so we don't need to add it

- Then we need to add the `_user` property that will make the relation with the current `user` by sending it `id` that is on already on the `req` object that ve got

  ```js
  module.exports = (app) => {
    app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(",").map((email) => ({
          email: email.trim(),
        })),
        _user: req.user.id,
      });
    });
  };
  ```

- We don't create the `email` that we gonna sent yet but this is close to that moment so we can add the `dateSent` property at this time

  ```js
  module.exports = (app) => {
    app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(",").map((email) => ({
          email: email.trim(),
        })),
        _user: req.user.id,
        dateSent: Date.now(),
      });
    });
  };
  ```

### Creating Mailers

We create the instance of the `survey` at this moment but this is not automaclly save in our `mongo` database but before to that save process is worth to talk about the flow of using that `survey` object and send an email to the `recipients`

- At this point we create an instance of a `survey`
- Then we gonna attempt to `create` and `send` an email to evey single `recipient` inside of the `survey`
- After that we ask if the `email` was succesfully send
- If is succefull we save the `survey`. We don't want to `save` the new `survey` if we wasn't able to send the `email` to the `recipients`

This is the flow that is going to take place in the `route handler` that we work before

#### Create and send an email

To continue with the flow explanation we need to dive in in the parts that `create` and `send` the `email`.

At this moment we got a `survey` instance kind of describe the `email` that we are gonna send out, in other words, our `data layer` but we need some code that describes what the `user` will see on the `email` so we will need an `email template` in other words it defines the structure of the `email`. When we got both pieces(`survey` instance and `email template`) we gonna merge those pieces in an object called `mailer` and this `mailer` object represent one single `email` that is going to be sent to one ore a list of people. Finally, after creating this `mailer` object we send it to our `email provider`(API that will automatically send the emails to the list of people that we need to send the `survey`).

To dive a little bit on the `email provider` process; we gonna take all the `recipients` that are included inside of the `survey` and create one single `mailer` then send that `mailer` object to our `email provider` in a single network request then we leave to our `email provider` how is going to handle the sending the `email` to each individual `recipient`.

The approach that talks in the previews paragraph will create an issue in our application. First, remember that for any given `email` we going to have an `email template` that is going to create the structure of the `email` like the subject and links that the `user` can click so if we are creating one `mailer` object to each `recipient` they all going to receive the same exact `email` including the links this will make us difficult to know which `recipient` one of our links in the `survey`(These links are important because we are gonna use it to know if a given `user` response our `survey` previously. We work on it in the `Recipients` model). To handle this issue we going to use our `email provider` at this case we going to use [Sendgrid](https://sendgrid.com/); that whenever we use `Sendgrid` to send a mail to one of our `users` automatically behind the scene it will look at the body of the `email` to see if there are links and if it finds a link it will change that to a custom link that sends it to their `Sendgrid` servers to collect metrics of the different links that the `user` is clicking then it will send then to the actual destination of the link. Also `Sengdrid` put in it custom link a `token` that uniquely identifies each `user` so `Sendgrid` know the actual `user` that click a link so at the moment that a `user` click on one of that custom links `Sendgrid` will send a message to our server telling us a link is clicked; this was the link and here is some information about the `user` that click that link. This last step that we mention refers to as a `webhook` that is anything that outside API facilitates a process and gives our application some kind of callback or a little notice that some event just occurs.

### Setup Sengrid

- First, need to create your `Sendgrid` account [here](https://signup.sendgrid.com/)
- Fill the form with your personal and company information; if you are using the account just for testing put your name as the company
- Verify your account with the `email` that `Sendgrid` send you
- Now on the option called `Single sender` click on the `Single server verification`
- Fill the form and if you are using this for testing you can put your name as a company name
- Verify the `email sender`
- Then on the `dashboard`, you're going to see a banner that said `send your first email`; open it options
- Click on the `start` button of the `integrate using web API or SMTP relay` section
- Then click on the `choose` button on the `Web api` section
- Choose `Node.js`
- Add a name for your `api key` in the `my first api key name` input
- Click on the `Create key` button
- Copy your key and store it in a save place
- Now create a new project on your local machine
- Inside of the root directory create a `package.json` file using: `npm init`
- Install as a `dev` dependency `@sendgrid/mail` package
  `npm install --save @sendgrid/mail`
- Create a new file on your root directory call `test.js`
- Copy the `Send your first email` snippet of code that is on the `Sendgrid` page
- Add on the `line 4` your `Sendgrid` api key
  `sgMail.setApiKey("SG.my.api.key");`
- Change the `line 6` to an email that you can access
- Change the `line 7` to the email that you verify as a sender on the `Sendgrid` page
- Go to the `Sendgrid` page and check the `I've integrated the code above` to continue with the process
- Then click on the `Next: Verify Integration` button
- Now on your local terminal go to the project that you create with the snippet of code that you created before
- Run the script using: `node test.js`
- Check that you receive an `email` on the mail that you use on the `line 6`
- If you successfully have the `email` go back to the `Sendgrid` page
- Click on the `Verify integration` button
- You should see a success message
- Now we can add our `Sendgrid` key to the project. Go to the `dev.js` in the `server/config` directory and add a new property call `sendGridKey` with your key
  `sendGridKey: "SG.your.api.key"`
- Then go to the `prod.js` file in the same directory and add the `sendGridKey` with the `Heroku` evn variable as it value
  `sendGridKey: process.env.SEND_GRID_KEY`
- Go to your `Heroku` dashboard and choose the project of this application
- Click on `settings`
- Then click on the `show config vars` button
- Add the `SEND_GRID_KEY` with your `Sendgrid` api key as it value
- Click on the `add` button
- Now finally on your terminal go to the `server` directory and install the `Sendgrid` dependency
  `npm install --save sendgrid`

### Mailer Setup

To set up the `mailer` object we are gonna use a `class` that will have a set of properties that are going to help us to create and send the `email`. At this case we will have a property that calls the `subject` that as you may know will be the `subject` of the `email` also a `recipients` property that will tell all the `emails` that we will send our `email`; those properties we already have the information in our `survey` instance. Next, we will have the `body` property that has the actual text of the `email` and at this moment the `email template`(provide the actual `HTML` body of the `email`) enters in action; where we pass one or two properties from the `survey` model and the `template` will produce some `HTML` that will be the actual `body` of the `email`. Finally, we have a `from_email` property is the `email` address that we are gonna put in the `from` field of the `email`.

After defining our `mailer` object we are gonna call a function that goes by the name `toJson()` that takes all the different configuration that we did on the `mailer` object and transform it on a `JSON` data and finally send it to `SendGrid`.

#### Steps to build the Mailer

- On the `server/services` directory create a file call `Mailer.js`
- Inside of the `Mailer.js` file import the `Sendgrid` module
  `const sendgrid = require("sendgrid");`
- Then create an object call `helper` with `sendgrid.mail` as it value
  `const helper = sendgrid.mail;`

  We can use `ES6` to export directly the `mail` object from the `SendGrid` module but on the `SendGrid` documentation they call this object `helper` so we will follow its combination.

- Then require the `keys` of the project
  `const keys = require("../config/keys");`
- Now create a `class` call `Mailer` that extend from `helper.mail`
  `class Mailer extends helper.Mail {}`
- Then we need to create a `constructor` that is the first function that is gonna be called when a new instance of the `Mailer` class is created

  ```js
  class Mailer extends helper.Mail {
    constructor() {}
  }
  ```

- Now we need to define the arguments that are gonna be in the constructor that are the same provide as arguments when we use the `new` keyword when we create an instance of a class. At this time we are gonna receive an `object` with a `subject` and `recipients` properties and a second argument with the `content`(template) of the mail.

  ```js
  class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {}
  }
  ```

We did it this way so we can reuse the `Mailer` class for other types of emails, not just a `survey` email

- Now we make sure that any `constructor` in the `Mailer` class get call using the `super` function

  ```js
  class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
  }
  ```

- Then we need to create a property that is called `from_email` that will represent the `from` information of the email. Make sure that you put the email that is specified as a `sender` on the `Sendgrid` page

  ```js
  class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
      super();

      this.from_email = new helper.Email("your_email@example.com");
    }
  }
  ```

- The next property is the `subject` and `body` that will receive the information from the parameter that receive the `constructor`

  ```js
  class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
      super();

      this.from_email = new helper.Email("your_email@example.com");
      this.subject = subject;
      this.body = new helper.Content("text/html", content);
    }
  }
  ```

  On the `body` property we use the `helper.Content` function to specify we are going to use `text/html` as it content

- At this moment we still missing the `recipients` property but before that we create it we need to have some amount of logic to process the data that we receive as a parameter so we are going to create a `formatAddresses` function that receive the `recipients` parameter and return the result of using a `map` function with the `recipients` and the `helper.Email` function

  ```js
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  ```

- Now you can create the `recipients` property

  ```js
  constructor({ subject, recipients }, content) {
    super();

    this.from_email = new helper.Email(keys.senderEmail);
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);
  }
  ```

- We need to add the `body` to the actual content of the mail using a function of the `helper.Mail` class call `addContent`
  `this.addContent(this.body);`
- Now we need to enable the `link tracking` of our email(Remember that we need to keep track of the links that are press) that will tell `Sendgrid` to scan the email and replace all links with their custom links so we will create a function call `addClicktracking`

  ```js
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  ```

  This is the configuration that they provide on its documentation

- Use the `addClickTracking` on the `constructor`
  `this.addClickTracking();`
- Now we need to add a fuction to take and process the list of `recipients`

  ```js
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach((recipients) => {
      personalize.addTo(recipients);
    });
    this.addPersonalization(personalize);
  }
  ```

  This is also the way `Sendgrid` documentation shows us to add the `recipients`

- Now call the `addRecipients` function on the constructor
  `this.addRecipients();`

- Finally we create our last property call `sgApi` that will be the representation of the `Sendgrid` library. We need to send our `Sendgrid` secret key
  `this.sgApi = sendgrid(keys.sendGridKey);`

- Now we need to create a function that actually send the email

  ```js
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });

    const response = await this.sgApi.API(request);
    return response;
  }
  ```

#### Mailer in use

Now that we got the `mailer` we can begin to do a basic implementation of it.

- First in the `surveyRoute` file import the `Mailer` class
  `const Mailer = require("../services/Mailer");`
- Now we need to create the `template` function that we going to send to the `Mailer` so on the `services` directory create a folder call `emailTemplate`
- Inside of the new directory create a file call `surveyTemplate.js`
- Inside of the `surveyTemplate.js` export a function that recive a the `survey` instance
  `module.exports = (survey) => {}`
- Now return a string with the `survey` body

  ```js
  module.exports = (survey) => {
    return `<div>${survey.body}</div>`;
  };
  ```

- Then import the `surveyTemplate` in the `surveyRoute` file
  `const surveyTemplate = require("../services/emailTemplates/surveyTemplate");`
- Now bellow the `survey` instance create a new `Mailer` instance sending the `survey` object and the `surveyTemplate` function with a `survey` as it parameter as a `class` configuration
  `const mailer = new Mailer(survey, surveyTemplate(survey));`
- Finally, we can test the `Mailer` class. First; bellow of the `mailer` object that you just created called the `send` method that we create before in the `Mailer` class
  `mailer.send();`
- Since we need to be logged in and have credits to test the route we are gonna take advantage of the `session` on the browser; to do this first we need to go to the `index.js` in the `client/src` directory and import the `axios` library
  `import axios from "axios";`
- Then create a property called `axios` on the `windows` object that contains the `axios` object that you imported
  `window.axios = axios;`
- Run the local `servers`
- Login in the application(make sure that the account have credits)
- Open the browser's `console`
- Create a `survey` object with all the properties that it needs to send an email

  ```js
  const survey = {
    title: "my title",
    subject: "my subject",
    recipients: "valid.email@example.com",
    body: "here is the body of the email",
  };
  ```

- Now call the `post` function from `axios` with the `/api/survey` endpoint and the `survey` object that you created
  `axios.post('/api/surveys', survey);`
- The request will be pending because we don't create a `response` on the `route handler` yet but you should receive an `email` in the mail that you specify as `recipient` in the `recipients` property

### Improving the Email template

At this moment we can at a little more detail on the content of the `email`. We don't gonna make a lot of improvement so feel free to add more styling to this section.

Go to the `surveyTemplate.js` file in the `services/emailTemplates` directory and place the following code

```js
module.exports = (survey) => {
  return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>I'd like your input</h3>
                <p>Please answer the following question:</p>
                <p>${survey.body}</p>
                <div>
                    <a href="http://localhost:3000">Yes</a>
                </div>
                <div>
                    <a href="http://localhost:3000">No</a>
                </div>
            </div>
        </body>
    </html>
  `;
};
```

Later we will update the `anchor` tag to redirect to the correct place. Now you can follow the same process that you use before to send an `email` and you should see the update on the body of the `email` and if you take a look at the `anchors` that are on the `email` you will see that `Sengrid` update the `href` as we mentioned before.

### Save the survey and update the user

Now that we test the `Mailer` class we can continue working with the `surveyRoute`. At this moment we need to `save` the `survey` and subtract one `credit` from the user that sent the `survey` so we need to follow the next steps

- On the `surveryRoute` file sice some operations that we are going to do are `asynchronous` we need to put the `async` keyword on the `handler` arorw function
  `app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {..}`
- Now after the creation of the `mailer` object we `send` the `email` but you need to wait that this operation finishes so we need to add the `await` keyword to it
  `await mailer.send();`
- Then we need to `save` the `survey` in our database so we use the `save` function and add the `await` keyword to it
  `await survey.save();`
- After saving the `survey` we need to subtract 1 `credit` from the current `user` that we have on the `req` object
  `req.user.credits -= 1;`
- Then we `save` the updated `user` to our database and from now we use the object that the `save` function returns as our updated `user`
  `const user = await req.user.save();`
- Now we can send the updated `user` on the respond
  `res.send(user);`
- Finally, we need to add a `try/catch` block to handle the `errors` that can occur on those operations and if we have an error we send a `422` status(`Unprocessable Entity`) with the error as a response to the `user`

  ```js
  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
  ```

Now you can test again sending an `email` and on the `network` tag of the browser see the response of the `survey` request and you can go to your `Sendgrid` account and on the `Activity` section on your dashboard, you can see the information that `Sendgrid` get about the emails that you send.

### Feedback for the user

If you notice we still have our local URL in the links of the `body` on the `email`; this is fine when we are working locally but we need a way to specify the environment that we need and it a little weird for our users that we send then to the front page of our application after they click the link of the `email` so we will add a new simple `route` to let then know that they actually are voting for in a `survey`

- First, go to the `dev.js` file in the `server/config` directory
- Add a new property call `redirectDomain` with the local URL of our application
  `redirectDomain: "http://localhost:3000"`
- Now got to the `prod.js` file in the same directory and add the same property with the `Heroku` environment variable
  `redirectDomain: process.env.REDIRECT_DOMAIN`
- Now go to `Heroku` and add the `REDIRECT_DOMAIN`(we follow that process before) with the URL of your `Heroku` app
- Then go to the `surveyRoute` and add the following `route handler`

  ```js
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!");
  });
  ```

- Go to the `surveyTemplate` file on the `services/emailTemplate`
- Require the `keys` file
  `const keys = require("../../config/keys");`
- Finally on both anchor tags add the following url
  `href="${keys.redirectDomain}/api/surveys/thanks"`

## Section 11: Survey on the client

We can continue working on the `route handlers` that still need to do in order to complete the `survey` task on the backend of our application but is a good moment to add in the client a way to add the `survey` that will help us to have a more clear view on the `survey` task that we are working. To create the `survey` on the client we will use a `form`; this `form` will have it own `route` and we can get to this `route` by a button on the `dashboard` page so this means that we will begin to work with this button on the `dashboard` page.

- Go to the `client/src/components` directory and create a file call `Dashboard.js`
- Then create a `Dashboard` component with some text to test and `export` it

  ```js
  import React from "react";

  const Dashboard = () => {
    return <div>Dashboard</div>;
  };

  export default Dashboard;
  ```

- Now go to the `App.js` file and `import` the new `Dashboard` component
  `import Dashboard from "./Dashboard";`
- Delete the example `Dashboard` function
- Go back to the `Dashboard` component and add the following code

  ```js
  const Dashboard = () => {
    return (
      <div>
        Dashboard
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </a>
        </div>
      </div>
    );
  };
  ```

  With `materiliza-css` this will add a button on the rigth corner of the browser that will be in charge of redirect us to the `survey` form

- No matter that we already install and use `materialize-css` on our application; we don't have any `icon` to use so we need to use a `link` tag to have the ability to use the `materialize-css` icons. So go to the `index.html` in the `public` directory and add this:
  `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
- You should see a button with a `plus` icon in the `dashboard` page
- Now we need to navigate between `routes` using the button so this mean that we need to use the `Link` component that `react-router-dom` provide to us instead of the `anachor` tag that we put to create the button. First import the `Link` component
  `import { Link } from "react-router-dom";`
- Update the button `anchor` using the `Link` compoent

  ```js
  const Dashboard = () => {
    return (
      <div>
        Dashboard
        <div className="fixed-action-btn">
          <Link to="/surveys/new" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  };
  ```

### SurveyNew form

Before we begin to work on the `survey` form we need to speak a little bit about what will be the process that the `user` is going to follow when he creates a `survey` and wants to send it.

The overall form component that we are going to use is gonna be called `SurveyNew` in other words that will be our container component then the actual fields, labels and all that is part of the form are going to be called `SurveyForm` and each individual field are going to be called `SurveyField`. We separate the form on this components because we got some amount of logic that will be complex because when the `user` enter the information of the `survey` on the form might accidentally make a mistake somewhere in the form we will give then the opportunity of review the information that they fill on the inputs instead of sending the email immediately so we will have another component called `SurveyFormReview` and they will have the change to go back to the form or send the `survey`; so this will create some complexity on our task.

As you see we have a lot of components that we will use on the form and some of then will need to share the information that the `user` supply in the form in other words we got a `SurveyNew` that is the father of all the components; a `SurveyForm` that is the father of multiples `SurveyField` and a `SurveyReviewForm` that doesn't have children and is sibling of the `SurveyForm`; knowing this we will have information on the multiple `SurveyField` that we will need to have on the `SurveyReviewForm` after the `user` click on a `submit` button so we need some way to make that information available on multiple components; if we just use `react` we will need to store all the data in the neartest comun parent in this case `SurveyNew` and send the input data as `props` in the `SurveyFormReview` but we already have a library that can help us to share this data between components that is `Redux` so we will have an `action creator` that is call on typing the inputs that update the `Redux store` and we just need to use `connect` to pull data from `Redux` in the `SurveyForReview` but actually we can save more coding time using another library that will preform all the `Redux` process actumoaclly that is call `Redux form`. So we will have `Redux` that create a `store` that is where all the data live inside of our application and we modify this data with the use of our `reducers` in our form case we will have a `formReducer` that is managed entirely by `Redux form` and it records all the values from our form automatically.

### Redux form setup

Now that we just spoke about the process and the tools involved with the `survey` form is a good time, to begin with, the setup

- First, we need to install the `Redux form` library. On your terminal go to the `client` directory use this command
  `npm install --save redux-form`
- Then on your editor go to the `reducers` directory to the `index.js` file
- Import the built-in `reducer` that `Redux form` create for us
  `import { reducer as reduxForm } from "redux-form";`

  For the convention, we rename the `reducer` to another name because the `reducer` name will be confusing to understand its purpose

- Then we need to add the `form` key with the `reduxForm` reducer in our `combineReducers`

  ```js
  export default combineReducers({
    auth: authReducer,
    form: reduxForm,
  });
  ```

  We need to add the `form` key because `Redux form` will expect that the values produced by the `reduxForm` reducer will be in this key

- At this point, we are ready to work on our form so we will begin to create the components that we need. On the `components` directory create a new folder call `surveys`
- Inside on the `surveys` directory create a file call `SurveyNew.js`
- In this new file create a `class` base component with some example text and export it

  ```js
  import React, { Component } from "react";

  class SurveyNew extends Component {
    render() {
      return <div>SurveyNew!</div>;
    }
  }

  export default SurveyNew;
  ```

- Now you can go to the `App.js` file and import the `SurveyNew` component
  `import SurveyNew from "./surveys/SurveyNew";`
- Delete the `SurveyNew` example function

### ReduxForm helper

At this moment we can begin to create our `form` component and use it on `SurveyNew` using `redux-form`

- First, create a new file call `SurveyForm.js` in the `components/surveys` directory
- Inside of the `SurveyForm` file create and export a class base component

  ```js
  import React, { Component } from "react";

  class SurveyForm extends Component {
    render() {
      return <div>SurveyForm!</div>;
    }
  }

  export default SurveyForm;
  ```

- Go to the `SurveyNew` component and import the `SurveyForm` component
  `import SurveyForm from "./SurveyForm";`
- Use the `SurveyForm` component inside of the `div` in the `return` statement in the `render` function

  ```js
  class SurveyNew extends Component {
    render() {
      return (
        <div>
          <SurveyForm />
        </div>
      );
    }
  }
  ```

- Now we can begin to hook the `SurveyForm` to the `redux-form` library so first, we will call a helper that will tell `redux-from` to take control of any `form` in the component called `reduxForm`
  `import { reduxForm } from "redux-form";`
- Using the `reduxForm` helper we now have access to the `redux store` and is a lot like the `connect` function that we use before in the implementation. Now on the export statement use the `reduxForm` helper like this

  ```js
  export default reduxForm({
    form: "surveyForm",
  })(SurveyForm);
  ```

  We gonna talk a little bit more about the configuration object that we use here

### Redux form in practice

At this moment we will add some fields in the `SurveyForm` instead of creating the `SurveyField` component to see a little bit of `redux-form` in practice.

- On the `SurveyForm` search the import statement of the `reduxForm` helper and import the `Field` component
  `import { reduxForm, Field } from "redux-form";`

  The `Field` component will help us to render absolutlly any type of traditional `HTML` form elements

- Now we can use it on the `return` statement in the `render` function

  ```js
  class SurveyForm extends Component {
    render() {
      return (
        <div>
          <Field type="text" name="surveyTitle" component="input" />
        </div>
      );
    }
  }
  ```

  The `Field` component can't be use by itself so we need to add certain `props` to it in order to render in the page

  - `type=text`: Specify the `type` of the element that we are gonna render in this case a input type text
  - `name="surveyTitle"`: The `name` property tells `redux-form` that we have on piece of data been produce by our form call `surveyTitle` in this case and you can be any string of your choosing. So when a `user` type on this field `redux-form` will take the value of that input and is gonna store it in our `redux` store by the key call `surveyTitle` in this case
  - `component="input"`: Tells the field component how is gonna be render; in this case will be render as a `HTML` input tag. We can send a component to this property instead of a `string`

- Now we need some way of `submit` the information of the `input` that we create so we gonna add that `input` inside of a `form` tag

  ```js
  return (
      <div>
        <form>
          <Field type="text" name="surveyTitle" component="input" />
        </form>
      </div>
    );
  }
  ```

- Next we need to add a `onSubmit` prop to the `form` tag with the value that we show here

  ```js
  return (
      <div>
        <form onSubmit={this.props.handleSubmit((value) => console.log(value))}>
          <Field type="text" name="surveyTitle" component="input" />
        </form>
      </div>
    );
  }
  ```

  The `handleSubmit` prop is a function that is provided automaclly by our `reduxForm` helper and when we call `handlerSubmit` and pass a function of our own this function will be call when the `user` submit the form

- Now add a button to `submit` the form

  ```js
  return (
      <div>
        <form onSubmit={this.props.handleSubmit((value) => console.log(value))}>
          <Field type="text" name="surveyTitle" component="input" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  ```

- Then you can run de app and go to the `survey/new` page
- Type something on the `input` field
- Open the browser console
- Click on the `submit` button
- You should see the data that you type on the `input` in an object with a key call `surveyTitle`

### Custom field component

Now that we have a better idea on how `redux-form` is gonna help us we can begin to create the `SurveyField` component for our custom field to have some amount of code that we can re-use on the different `inputs` and `label` that we are going to use in our form.

- On your editor go to the `components/survey` directory
- Create a new file call `SuveryField.js`
- Create and export a functional component that returns an input

  ```js
  import React from "react";

  export default () => {
    return (
      <div>
        <input />
      </div>
    );
  };
  ```

- Go to the `SurveyField` component and import the component that you just created
  `import SurveyField from "./SurveyField";`
- Delete the `Field` component that we create
- Create a function call `renderFields` inside of the `SurveyForm` calls that returns the `Field` component with the `type=text`; for now the `name=title` and on the `components` props use the `SurveryField` component

  ```js
  renderFields() {
    return (
      <div>
        <Field type="text" name="title" component={SurveyField} />
      </div>
    );
  }
  ```

- Use the `renderFields` function on the same place that we have the first `Field` that we add before

  ```js
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit((value) => console.log(value))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  ```

- Test on your local and you should see the same result that the preview example without the submit data
- At this moment our `input` is rendered by the `Field` component so `redux-form` have the ability to send a lot of `props` to our `SurveyField` component and we can `use` it to connect our input to the `redux-form` library so add `props` as a parameter of the `SurveyField` component and `console.log` it

  ```js
  export default (props) => {
    console.log(props);
    return (
      <div>
        <input />
      </div>
    );
  };
  ```

  As you see on the browser you have an object that the `redux-form` library sends to our component. If you see closely you will see an `input` property that has a couple of these functions and if you look those functions closely you will see that are events handlers automatically generated by `redux-form`. So if we take all the `props` that are on the `input` key and pass it to our `input`; the `redux-form` library watch for any changes that match with one of this `event handlers`

- Now we can use `destructuring` to receive the `input` object directly and pass it to our `input`

  ```js
  export default ({ input }) => {
    return (
      <div>
        <input {...input} />
      </div>
    );
  };
  ```

- Now test on your browser and submit the data. You should see an object with the information in the browser's console
- If you see the expected result we can continue building our `SurveyField` component. Each `input` will have an individual `labels` that represent then so we need to add a new `prop` on our `SurveyField` component call `label`
  `export default ({ input, label }) => {...}`
- Now add a `label` tag and use the `label` prop

  ```js
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
  ```

- Then go to the `SurveyForm` component and on the `Field` component add a new prop call `label` with the information that you want

  ```js
  <Field
    label="Survey Title"
    type="text"
    name="title"
    component={SurveyField}
  />
  ```

  By default, each property that you add to the `Field` component will be sent to our `SurveyField` component

- Now test on your browser that the `label` exist
- Then we need to add the other `fields` for our form. For this purpose, we gonna use the `map` function from `lodash` so go to your terminal and on the `client` directory install the `lodash` package
  `npm install --save lodash`
- On your editor go to the `SurveyForm` and import the `lodash` module
  `import _ from "lodash";`
- Now we need to create an `array` with the properties that repeat itself on each `Field` component that we need

  ```js
  const FIELDS = [
    { label: "Survey Title", name: "title" },
    { label: "Subject Line", name: "subject" },
    { label: "Email body", name: "body" },
    { label: "Recipient list", name: "emails" },
  ];
  ```

- Go to the `renderFields` helper function and remove the current `Field` component
- Use the `map` function from `lodash` to loop throw the `FIELDS array`

  ```js
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  ```

- Go to your browser and test all `fields`

### Add buttons with style

Like we mentioned before the `submit` button that we have actually is not going to `submit` the `survey` that we just created with the form instead is going to a review page so the `user` can do the last check on the information that he is going to `submit`. With this, we can begin to work a little bit on the looks of the button.

Also, we are going to have a `cancel` button on the form to get back to the `dashboard` page

- On your editor go to the `SurveyForm` component
- Import the `Link` component from `react-router-dom`
  `import { Link } from "react-router-dom";`
- Add a `Link` before the `submit` button with the following classes and message

  ```js
  <Link to="/surveys" className="red btn-flat white-text">
    Cancel
  </Link>
  ```

- Now update the `submit` button like this

  ```js
  <button type="submit" className="teal btn-flat right white-text">
    Next
    <i className="material-icons right">done</i>
  </button>
  ```

- Test on the browser the buttons

### Form validation

We got almost complete our form but is still missing one of the important parts of a form that is the `validation` to prevent the `user` to submit the incorrect data values.

- On your editor go to the `surveyForm` component
- Add the following property to the `reduxForm` configuration object

  ```js
  export default reduxForm({
    validate,
    form: "surveyForm",
  })(SurveyForm);
  ```

  If we passed a function on the key `validate` that function will run anytime that a `user` wants to submit the form so we can use it to validate the data of the form and provide feedback to the `user`.

- Now before of the export statement create a function call `validate` and recive `values` as a parameter
  `function validate(values) {}`

  The `values` parameter is automatically passed by `redux-form` to the `validate` function containing the values relate to the form that the user is attending to `submit`

- Next, we need to return an object that `redux-form` will check if is empty `redux-form` assume that the form is valid and continue with the `submit` process but is have some property will consider that the form is invalid

  ```js
  function validate(values) {
    const errors = {};

    return errors;
  }
  ```

- Now we can add our first validation rule. Add a condition that checks if the `title` property of the `values` object exists and if don't exist add the `title` property with a string with an error message

  ```js
  function validate(values) {
    const errors = {};

    if (!values.title) {
      errors.title = "You must provide a title";
    }

    return errors;
  }
  ```

#### Showing validation errors

At this moment have our first validation rule but we still not show it to the `user` in the browser. We can begin the process to show it on the browser.

When you add the `title` property in the `errors` object `redux-form` automatically associate that `error` with the field that has the same name in this case `title` and we can access to it in the `meta` object that `redux-form` send you to the `surveyField` component.

- First, on your editor go to the `surveyField` component add `meta` as a prop of the component and `console.log` it value

  ```js
  export default ({ input, label, meta }) => {
    console.log(meta);
    return (
      <div>
        <label>{label}</label>
        <input {...input} />
      </div>
    );
  };
  ```

- Go to your browser and submit the form
- Check on the console and on the first log check the object and you should see an `error` property with the message that you create in the `validate` function before
- Now add delete the `console.log`
- Update the `meta` parameter so we can use destructuring to it
  `export default ({ input, label, meta: { error, touched } }) => {...};`
- Add the `error` bellow the `input` always asking if `touched` is `true`

  ```js
  export default ({ input, label, meta: { error, touched } }) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} />
        {touched && error}
      </div>
    );
  };
  ```

  The `touched` property of the `meta` object has a value of `true` after the `user` touch the input and we will use it to present the `error` because if we don't at it the `error` will show even the `user` doesn't use the input

- Now we can continue adding the validation of the other inputs and some styling. On the `surveyField` component add the following code to have a better experience when you see the `error`

  ```js
  export default ({ input, label, meta: { error, touched } }) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} style={{ marginBottom: "5px" }} />
        <div className="red-text" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  };
  ```

- Then go to the `SurveyForm` component and update the condition of the `validate` function with the following code

  ```js
  function validate(values) {
    const errors = {};

    _.each(FIELDS, ({ name }) => {
      if (!values[name]) {
        errors[name] = "You must provide a value";
      }
    });

    return errors;
  }
  ```

  At this case we are going to use the `FIELDS` object and use the `name` to know with `value` that we want to check and to add it to the `error` object if is needed

- Test on the browser and you should see an error on every `input` when you try to `submit` or `touch` the `input` and don't add text
- We now need a special kind of validation for the `recipients` input because the `user` will have to enter the `emails` with a specific parterm and separate each one with a comma and space so this mean we need to add another piece of logic that handle all this. First we need to create a new function to store all this logic so we need to create a new directory call `utils` in the `src` folder
- Inside of the new directory add a file call `validateEmails.js`
- Now create a export a function that recibe `emails` as a parameter
  `export default (emails) => {}`
- Then we need to `split` every `email` and eliminate the extra `space` that they have
  `const invalidEmails = emails.split(",").map((email) => email.trim());`
- We need now to `test` if an `email` is valid and to do this we are gonna use a [regular expresion](https://en.wikipedia.org/wiki/Regular_expression). To obtain this `regular expression` on your browser go to the [emailregex](http://emailregex.com/) page
- Scroll down and find the `Javascript`; then copy the `regular expression`
- Go to the `validateEmails` file and on the top of the file create a variable call `re` and use the `regular expression` that you just copy as it value
  `const re = your_js_regular_expretion`
- Now that we separate and remove the spaces of the `emails` we need to `filter` to find the invalid `emails` on the array using the `test` function return just the invalid `emails`

  ```js
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => {
      if (email.length) return re.test(email) === false;
    });
  ```

- Then create a condition that checks if `invalidEmails` have a `length` and if it does you will add a message and the invalid `emails`

  ```js
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
  ```

- Go to the `SurveryForm` component and import the `validateEmails` function
  `import validateEmails from "../../utils/validateEmails";`
- On the `validate` function before the condition call the `validationEmails` adding it value to the `emails` property of the `error` object

  ```js
  function validate(values) {
    const errors = {};

    errors.emails = validateEmails(values.emails || "");

    _.each(FIELDS, ({ name }) => {
      if (!values[name]) {
        errors[name] = "You must provide a value";
      }
    });

    return errors;
  }
  ```

  We add an empty string when we call the `validateEmails` function because when we render the page the validations will run and `values.emails` will be `undefined`. Also, it's important that we put the `error.emails` before the `empty` validation because it will override the validations of the `email` checking

### Toggling visibility

At this moment we finish setting up our form so is a good time to continue with the `surveyReview` component. We need to begin to think about how we gonna show the `SurveyReview` after we complete the form.

We got a couple of options that we can use to toggle between the 2 views. First, we can create a separate `route` for the `surveyReview` component this means that after the `user` click the next button will go to a new `route` for example `survey/new/review` and when the `user` is there we show to it the `review` screen; this will be a very clear and easy to understand implementation but have one downside that is if a `user` for some reason go to the specific `route` that represent the `review` screen; it can go to this `route` without passing to the `route` of the form and the `user` will not have information related of a `survey`. The other option is to use `Redux` so whenever a `user` click the next button we update some a `state` on the `Redux store` that symbolizes that the `user` complete with valid information the form and can progress to the `review` page then on the `SurveyNew` component we can use that piece of `state` to decide with the component we will show but this option has a downside too that is that we need to update the `action creator`; create an `action`; update the `reducer` and add the necessary parts to the `SurveyNew` component to use that piece of `state` so this means that we need a lot of extra code and effort to do the `toggle` task. The last option that we can use to control the `toggle` is to create a `component level state`; in the `SurveyNew` we can add a little piece of `state` maybe a `boolean` that with `true` or `false` value show on the components and we need to pass a `handler` to both `SurveyForm` and `SurveyReview` component that `toggle` that piece of `state`. The last option solves the `route` issue of the first option and take less effort than the second option so we will use the last option to do the `toggle` task.

On a little side note, we mention that we are gonna use a component level `state` for the `toggle` task but maybe you are asking why a component level `state`? if we got `Redux` to manage all the `state` of the application. This is because this particular `state` will be used only in one component and there will not have any other component that cares about this particular `state`.

#### Adding the toggle state and use it

- First, on the `survey` directory create a new file call `SurveyFormReview.js`
- On this new file build a component that returns an `h5` with a message

  ```js
  import React from "react";

  const SurveyFormReview = () => {
    return (
      <div>
        <h5>Please confirm your entries</h5>
      </div>
    );
  };

  export default SurveyFormReview;
  ```

- Now on the `SurveyNew` component import the `SurveyFormReview` component
  `import SurveyFormReview from "./SurveyFormReview";`
- Then initialize a `state` on the `SurveyNew` component call `showFormReview` and its initial value will be `false`

  ```js
  state = {
    showFormReview: false,
  };
  ```

- Create a function call `renderContent` to use this new `state` to render the component that we need

  ```js
  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview />;
    }

    return (
      <SurveyForm />
    );
  }
  ```

- Them remove the `SurveyForm` call on the `render` function and put in his place the `renderContent` function

  ```js
  render() {
    return <div>{this.renderContent()}</div>;
  }
  ```

- Now we can add a prop on the `SurveyForm` with use the toggle `state`

  ```js
  <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
  ```

- Go to the `SurveyForm` component and use this prop on the `onSubit` property or the form
  `<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>...</form>`
- Now you can test locally filling the form and clicking `next`. You should see the `SurveyFormReview` content
- We can continue now with the `SurveryFormReview` and the `back` button that returns the user to the previews form but first go to the `SurveyForm` component and add the new prop we call it `onCancel` in the `SurveyFormReview` call

  ```js
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  ```

- No go to the `SurveyFormReview` and add the following code

  ```js
  const SurveyFormReview = ({ onCancel }) => {
    return (
      <div>
        <h5>Please confirm your entries</h5>
        <button className="yellow darken-3 btn-flat" onClick={onCancel}>
          Back
        </button>
      </div>
    );
  };
  ```

- Finally, on your browser fill the form and get to the `review` content
- Click the `back` button
- You should see the form again after clicked

### Persisting form values

As you may notice at this moment each time you are back from the `review` component all the form values disappear; this is because `redux-form` have a pre-configuration that delete all values when the component that has the form is unmounted but for our application, we need those values to persist between components. Is kind of straightforward because you only need to add one more property in the `reduxForm` helper that we defined on the `SurveyForm` component that is called `destroyOnUnmount` and set it value to `false`(by default is `true`)

```js
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
```

Now you can go back from the `review` content and you will see that the values persist but we still missing the values on the `SurveyFormReview` component to actually said that the form's value persists in both components. To have the access to those form values as you may infer we going to use `Redux`; because from the beginning of the setup of the form that was our intention and `redux-form` automatically set that `state` on the `Redux store` for us.

So in the `SurveyFormReview` import the `connect` helper from `react-redux`:
`import { connect } from "react-redux";`

Now we need to create the `mapStateToProps` that receive our `state` but for now, we are gonna `console.log` the `state` and return an empty object.

```js
function mapStateToProps(state) {
  console.log(state);
  return {};
}
```

Then add the `connect` helper:
`export default connect(mapStateToProps)(SurveyFormReview);`

At this moment we can begin to test the `state` and see if we got the form values. To do this you just need to fill the form and click the `next` button then check your browser `console`. If you were successful you will see the `states` that are in the `redux store` in the case `auth` and `form`. On the `form` object you will see a property called `surveyForm` that has a property called `values` that as you realize now are the form values. But why we got a `form` state and a `surveyForm` object that have the values? This is because we set it this way inside of the configuration object that we send to the `helper` call `reduxForm` in the `SurveyForm`; by adding `form: "surveyForm"` we told `redux-form` that store all our form values in a key call `surveyForm`. This configuration is helpful when you got more than one form to separate its values.

Now that we got where are the form values we can update the `mapStateToProps` function:

```js
function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}
```

### Refactoring form fields

Before we dive in on the `SurveyFormReview` we need to be a little change to our `SurveyForm` because we are gonna use some of the values in the `SurveyFormReview` component, in this case, the input `label` because are going to be the same in both components and if one of this `labels` change we want that both components reflect the changes. So we will follow the next steps:

- On the `surveys` directory create a file call `formFields.js`
- Inside of this new file export an array with the same content of the `FIELDS` array in the `SurveyForm` component

  ```js
  export default [
    { label: "Survey Title", name: "title" },
    { label: "Subject Line", name: "subject" },
    { label: "Email body", name: "body" },
    { label: "Recipient list", name: "emails" },
  ];
  ```

- Go to the `SurveyForm` componente and import this new `formFields` array
  `import formFields from "./formFields";`
- Delete the `FIELDS` array
- Go to the `map` function in the `renderFields` helper and change `FIELDS` for `formFields`
  `return _.map(formFields, ({ label, name }) => {...}`
- Then go to the `validate` function and remove `FIELDS` from the `each` function for `formFields`
  `_.each(formFields, ({ name }) => {...}`
