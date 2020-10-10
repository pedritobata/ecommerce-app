const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Perico Martinez',
        email: 'pedritobata@gmail.com',
        password: bcrypt.hashSync("123456",10),
        isAdmin: true
    },
    {
        name: 'Jhon Carrillo',
        email: 'jhoncito@gmail.com',
        password: bcrypt.hashSync("123456",10)
    },
    {
        name: 'Tomas Matsufuji',
        email: 'chinito@gmail.com',
        password: bcrypt.hashSync("123456",10)
    },
];

module.exports = users;