const Sequelize = require('sequelize')
const connection = require('./database')

const Answers = connection.define('answers', {
    answerBody:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Answers.sync({force: false}).then(() => {})

module.exports = Answers