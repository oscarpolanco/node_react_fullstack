# Node & React fullstack development project

This application is inspired by the [Node with React: Fullstack Web Development](https://www.udemy.com/course/node-with-react-fullstack-web-development/) course but you will see that the application will be updated and have some new features that are not part of the course. Feel free to fork this repository and play around with it then share your experience with me so we both can learn.

## Requiretments

- [Nodejs](https://nodejs.org/en/)
- To work with the project you will need to create a [Google application](https://github.com/oscarpolanco/node_react_fullstack/tree/master/sections_text#enabling-google-oauth-api)
- [mongoDB](https://www.mongodb.com/)
  - for this example we use [mongoDB Atlas](https://www.mongodb.com/cloud/atlas/efficiency?utm_source=google&utm_campaign=gs_footprint_row_search_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&gclid=Cj0KCQjw17n1BRDEARIsAFDHFezGsmIdQodv9F1O0kOECHGqfF6Ib2uO_aoO1YiesmVWGGp6XjILbpEaArYEEALw_wcB)
  - [here](https://github.com/oscarpolanco/node_react_fullstack/tree/master/sections_text#mongodb-atlas-setup-and-configuration-and-moongose-setup) is a guide to help you to install it
- A test mode [Stripe](https://stripe.com/) account. [Here](https://github.com/oscarpolanco/node_react_fullstack/tree/master/sections_text#create-a-stripe-account) are the steps to create a `stripe` account.
- A [Sendgrid](https://sendgrid.com/) account. [Here](https://github.com/oscarpolanco/node_react_fullstack/tree/master/sections_text#setup-sengrid) are the step to set a `Sendgrid` account.

## Tools and modules on use in the application

- [Express](http://expressjs.com/) on the `server` side of the application
- [Passport](http://www.passportjs.org/) for the `authentication` process
- [Create-react-app](https://create-react-app.dev/docs/getting-started/) to generate the `client` side
- [React](https://reactjs.org/) for the `client` side of our application
- [Materilize-css](https://materializecss.com/) for the `styles` of the application
- [Redux](https://redux.js.org/introduction/getting-started) to manage the `state` of our application
- [Redux form](https://redux-form.com/8.3.0/) to control the form of the application
- [React Router](https://www.npmjs.com/package/react-router-dom) for the navigation on the `client`
- [StripeCheckout](https://www.npmjs.com/package/react-stripe-checkout) for the payment process on the client
- [Stripe](https://www.npmjs.com/package/stripe) for the payment process on the backend
- [Sendgrid](https://www.npmjs.com/package/sendgrid) to send `emails`
- [Ngork](https://ngrok.com/) to test the `webhook` locally

## Pages

- [Landing page](http://localhost:3000/)
- [Dashboard](http://localhost:3000/surveys)
- [Survey page](http://localhost:3000/surveys/new)

## Step to run the example

- On your terminal go to the `server` directory
- Install all the dependencies using: `npm install`
- On the `config` directory add a file called `dev.js`
- On the `dev.js` file `export` and object with the following properties

  ```
  googleClientID: `id` of your google application,
  googleClientSecret: Secret `id` of you google application,
  mongoURI: Connection string of mongoDB,
  cookieKey: Random string to encrypt the cookie of the application,
  stripePublishableKey: your `stripe` account public key,
  stripeSecretKey: your `stripe` account secret key,
  redirectDomain: "http://localhost:3000",
  senderEmail: your Sendgrid `sender` email,
  ```

- Then go to the `client` directory
- Create a `.env.development` and `.env.production` file
- Add the `stripe` public key in both files like this:
  `REACT_APP_STRIPE_KEY=pk_test_my_public_key`
- Install all the `client` dependencies using: `npm install`
- Go back to the `server` directory
- Run both `server` using `npm run dev`
- On another tap of your terminal run `Ngrok`: `npx ngrok http 5000`
- Copy the `https` link that `Ngrok` sends to you
- Set the `Sendgrid webhook` with that URL and the `webhook` route of the application
  `https://my_ngrok_url/api/surveys/webhooks`

  [Here](https://github.com/oscarpolanco/node_react_fullstack/blob/master/sections_text/README.md#set-webhook-on-sendgrid) are the steps to set the `Sendgrid webhook`
