// Importing libraries and dependencies
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Questions = require('./database/Questions')
const Answers = require('./database/Answers')

// Setting up libraries and dependencies
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Connection with database successful')
    })
    .catch(error => {
        console.log(error)
    })

// Routes
app.get('/', (req, res) => {
    Questions.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(Questions => {
        res.render('index', {
            questions: Questions
        })
    })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/savequestion', (req, res) => {
    let questionTitle = req.body.questionTitle
    let questionBody = req.body.questionBody

    Questions.create({
        title: questionTitle,
        body: questionBody
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id

    Questions.findOne({
        where: { id: id }
    }).then(question => {
        if (question != undefined) {
            Answers.findAll({
                where: { questionId: question.id }
            }).then(answers => {
                res.render('pergunta', {
                    questions: question,
                    answers: answers
                })
            })
        } else {
            res.redirect('/')
        }
    })
})

app.post('/saveanswer', (req, res) => {
    let answerBody = req.body.answerBody
    let questionId = req.body.questionId

    Answers.create({
        answerBody: answerBody,
        questionId: questionId
    }).then(() => {
        res.redirect(`pergunta/${questionId}`)
    })
})

app.listen(port, (req, res) => { console.log('Server on.') })