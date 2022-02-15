const usersRouter = require('express').Router()
const pool = require('../db/conf')


usersRouter.get('/', (req, res) => {
  pool.query('SELECT * FROM users')
  .then(data => res.json(data.rows))
  .catch(err => res.json(err))
})

usersRouter.post('/', (req, res) => {
    const {first_name, last_name, age, tokenid} = req.body    
    pool.query('INSERT INTO users (first_name, last_name, age, tokenid) VALUES($1,$2,$3,$4)', [first_name, last_name, age, tokenid] )
    .then(data => res.json(data.rows))
    .catch(err => res.json(err.detail))
  })

  usersRouter.delete('/:id', (req, res) => {
    const {id} = req.params    
    pool.query('DELETE FROM users where id = $1', [id] )
    .then(data => res.json('User has been deleted'))
    .catch(err => res.json(err.detail))
  })

module.exports = usersRouter