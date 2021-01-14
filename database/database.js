const Sequelize = require('sequelize')
const connection =  new Sequelize('questionsAndAnswers','root','joaopessoa3',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection