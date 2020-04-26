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
