import { ApolloServer, gql } from 'apollo-server';
import { faker } from '@faker-js/faker';
faker.locale = 'pt_BR';

const currencyBRL = (value) => {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};

const generateUser = () => ({
  id: faker.datatype.uuid(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  age: faker.datatype.number(80),
  realSalary: faker.finance.amount(21000, 25000, 2),
  taxSalary: faker.finance.amount(27000, 35000, 2),
  vip: faker.datatype.boolean(),
});

const typeDefs = gql`
  scalar Date

  type User {
    id: ID
    name: String!
    email: String!
    age: Int
    salary: String
    taxSalary: String
    vip: Boolean
  }

  type Product {
    name: String!
    price: Float!
    discount: Float
    discountPrice: String
  }

  # API entrance
  type Query {
    today: String!
    timeNow: String!
    date: Date!
    loggedUser: User
    featuredProduct: Product
    lotteryNumbers: [Int!]!
    getUsers: [User!]!
  }
`;

const resolvers = {
  User: {
    salary(user) {
      return currencyBRL(user.realSalary);
    },
    taxSalary(user) {
      return currencyBRL(user.realSalary * 1.272);
    },
  },
  Product: {
    discountPrice(product) {
      return currencyBRL(product.price - product.price * (product.discount / 100));
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
    loggedUser() {
      return {
        id: 1,
        name: 'Vinicius',
        email: 'vscolasanto@gmail.com8',
        age: 18,
        realSalary: 22970.43,
        vip: true,
      };
    },
    featuredProduct() {
      return {
        name: 'Playstation 5',
        price: 5900.9,
        discount: 10,
      };
    },
    lotteryNumbers() {
      return [
        ...new Set(
          Array(15)
            .fill(0)
            .map(() => parseInt(Math.random() * 60 + 1))
        ),
      ]
        .slice(0, 6)
        .sort((a, b) => a - b);
    },
    getUsers() {
      let users = [];
      Array.from({ length: 50 }).forEach(() => users.push(generateUser()));
      return users;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`server is running on ${url}`);
});
