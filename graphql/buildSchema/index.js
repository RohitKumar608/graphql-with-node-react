var { buildSchema } = require("graphql");
module.exports = buildSchema(`
type Event {
  _id: ID
  title: String!
  description: String!
  price: Float!
  date: String!
}
type User {
  _id: ID
  email: String,
  password: String
}
type RootQuery {
  events: [Event]!
}
input userInput {
  email: String,
  password: String!
}
input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}
type RootMutation {
  createEvent(eventInput: EventInput): Event,
  createUser(userInput: userInput): User
}
schema{
    query: RootQuery
    mutation: RootMutation
  }
`)