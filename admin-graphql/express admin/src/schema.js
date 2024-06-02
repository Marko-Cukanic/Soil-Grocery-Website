const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    users: [User]
    products: [Product]
  }

  type Mutation {
    blockUser(id: Int!): User
    unblockUser(id: Int!): User
    addProduct(name: String!, price: Float!, specialPrice: Float, image: String!): Product
    editProduct(id: Int!, name: String, price: Float, specialPrice: Float, image: String): Product
    deleteProduct(id: Int!): Product
  }

  type User {
    id: Int
    name: String
    email: String
    blocked: Boolean
    dateJoined: String
    age: Int
    weight: Float
    height: Float
    activityLevel: String
    dietaryPreferences: String
    healthGoals: String
  }

  type Product {
    id: Int
    name: String
    price: Float
    specialPrice: Float
    image: String
  }
`);

module.exports = schema;
