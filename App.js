var express = require('express')
require('dotenv').config()
var graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const resolver = require('./graphql/resolver/index')
const buildSchema = require('./graphql/buildSchema/index')
var app = express()

app.use(bodyParser.json())

const events = []
app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema,
    rootValue: resolver,
    graphiql: true,
  })
)
app.listen(3000, () => {
  console.log('server running at http://localhost:3000/graphql')
})
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.47oq7.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connected successfully')
  })
  .catch((error) => console.log(error))
