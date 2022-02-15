const tokensRouter = require('express').Router()
const pool = require('../db/conf')


tokensRouter.get('/', (req, res) => {
    pool.query('SELECT * from token')
    .then(data => res.json(data.rows) )
    .catch(err => console.log(err))
})

tokensRouter.post('/', (req, res) => {
    const {value} = req.body    
    pool.query('INSERT INTO token (value) VALUES($1)', [value] )
    .then(data => res.json(data.rows))
    .catch(err => res.json(err.detail))
  })


module.exports = tokensRouter