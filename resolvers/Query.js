const { roles, generateUser } = require('../data/utils');

module.exports = {
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
    return generateUser();
  },
  getUser(_, { id }) {
    const found = generateUser().find((user) => user.id === id);
    return found;
  },
  getRoles() {
    return roles;
  },
  getRole(_, { id }) {
    return roles.find((role) => role.id === id) || null;
  },
};
