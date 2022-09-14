import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  # API entrance
  type Query {
    today: String
    timeNow: String
  }
`;

const resolvers = {
  Query: {
    today() {
      const date = new Date();
      return date.toLocaleDateString('pt-BR');
    },
    timeNow() {
      const date = new Date();
      return date.toLocaleTimeString('pt-BR');
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`server is running on ${url}`);
});
