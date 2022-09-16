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

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: String
  }

  # API entrance
  type Query {
    today: String!
    timeNow: String!
    date: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
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
  Produto: {
    precoComDesconto(produto) {
      return currencyBRL(produto.preco - produto.preco * (produto.desconto / 100));
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
    produtoEmDestaque() {
      return {
        nome: 'Playstation 5',
        preco: 5900.9,
        desconto: 10,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`server is running on ${url}`);
});
