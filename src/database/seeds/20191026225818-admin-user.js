const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface) => {
      return queryInterface.bulkInsert('users', [{
        name: 'Admin',
        email: 'admin@gympoint.com',
        password_hash: bcrypt.hashSync('adm123', 8),
        created_at: new Date(),
        updated_at: new Date()
      }], {});
  },

  down: () => {
  }
};
