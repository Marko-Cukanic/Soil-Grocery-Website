const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql2/promise');

const app = express();

// Define schema
const schema = buildSchema(`
  type Query {
    getUsers: [User]
  }
  type User {
    id: Int
    name: String
    email: String
  }
`);

// Define resolvers
const root = {
  getUsers: async () => {
    const connection = await mysql.createConnection({
      host: 'your-host',
      user: 'your-username',
      password: 'your-password',
      database: 'your-database'
    });

    const [rows] = await connection.execute('SELECT * FROM users');
    return rows;
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Server running on port 4000'));
