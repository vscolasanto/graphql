import { ApolloServer, gql } from 'apollo-server';

const currencyBRL = (value) => {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: String
    salarioComImposto: String
    vip: Boolean
  }

  # API entrance
  type Query {
    today: String!
    timeNow: String!
    date: Date!
    usuarioLogado: Usuario
  }
`;

const resolvers = {
  Usuario: {
    salario(user) {
      return currencyBRL(user.salarioReal);
    },
    salarioComImposto(user) {
      return currencyBRL(user.salarioReal * 1.272);
    },
  },
  Query: {
    today() {
      const date = new Date();
      return date.toLocaleDateString('pt-BR');
    },
    timeNow() {
      const date = new Date();
      return date.toLocaleTimeString('pt-BR');
    },
    date() {
      return new Date();
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: 'Vinicius',
        email: 'vscolasanto@gmail.com8',
        idade: 18,
        salarioReal: 22970.43,
        vip: true,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`server is running on ${url}`);
});
