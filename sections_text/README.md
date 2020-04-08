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
