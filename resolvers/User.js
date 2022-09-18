const { currencyBRL, roles } = require('../data/utils');

module.exports = {
  salary(user) {
    return currencyBRL(user.realSalary);
  },
  taxSalary(user) {
    return currencyBRL(user.realSalary * 1.272);
  },
  role(user) {
    return roles.find((role) => role.id === user.roleId) || null;
  },
};
