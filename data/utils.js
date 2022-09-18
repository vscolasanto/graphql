const { faker } = require('@faker-js/faker');

const currencyBRL = (value) => {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};

const roles = [
  { id: 1, description: 'Common' },
  { id: 2, description: 'Admin' },
];

const user = () => ({
  id: faker.datatype.uuid(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  age: faker.datatype.number(80),
  realSalary: faker.finance.amount(21000, 25000, 2),
  taxSalary: faker.finance.amount(27000, 35000, 2),
  vip: faker.datatype.boolean(),
  roleId: faker.datatype.number({ min: 1, max: 2 }),
});

const generateUser = () => {
  const fixedUser = {
    id: 'qar512as-23rwer-12tdsgr',
    name: `Bernardo Silva`,
    email: 'bernardao@email.com',
    age: 19,
    realSalary: 19000,
    taxSalary: 21000,
    vip: true,
    roleId: 2,
  };

  let users = [];
  Array.from({ length: 50 }).forEach(() => users.push(user()));
  return [...users, fixedUser];
};

module.exports = { currencyBRL, roles, user, generateUser };
