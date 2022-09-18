const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { faker } = require('@faker-js/faker');
faker.locale = 'pt_BR';

const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs: importSchema('./schema/index.graphql'),
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`server is running on ${url}`);
});
