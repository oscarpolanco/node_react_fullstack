# Node & React fullstack development project

## Requiretments

- [Nodejs](https://nodejs.org/en/)
- To work with the project you will need to create a [Google application](https://github.com/oscarpolanco/node_react_fullstack/tree/master/sections_text#enabling-google-oauth-api)
- [mongoDB](https://www.mongodb.com/)
  - for this example we use [mongoDB Atlas](https://www.mongodb.com/cloud/atlas/efficiency?utm_source=google&utm_campaign=gs_footprint_row_search_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&gclid=Cj0KCQjw17n1BRDEARIsAFDHFezGsmIdQodv9F1O0kOECHGqfF6Ib2uO_aoO1YiesmVWGGp6XjILbpEaArYEEALw_wcB)
  - [here](https://github.com/oscarpolanco/node_react_fullstack/tree/master/sections_text#mongodb-atlas-setup-and-configuration-and-moongose-setup) is a guide to help you to install it

## Step to run the example

- Install [nodejs](https://nodejs.org/en/)
- On your console go to the `server` directory
- Install all the dependencies using: `npm install`
- On the `config` directory add a file called `keys.js`
- On the `keys.js` file `export` and object with the following properties
  ```
  googleClientID: `id` of your google application,
  googleClientSecret: Secret `id` of you google application,
  mongoURI: Connection string of mongoDB,
  cookieKey: Random string to encrypt the cookie of the application,
  ```
- Use the `node` command to run the server: `node index.js`
