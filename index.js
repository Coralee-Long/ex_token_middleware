const express = require("express");
const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended : false
}))
const secure = require('./middlewares/secure');
const tokensRouter = require("./routes/tokensRouter");
const usersRouter = require('./routes/usersRouter')
const pool = require('./db/conf')


app.get('/verify/:token', (req, res) => {
    const {token} = req.params
    pool.query(`SELECT * FROM token where value = $1 `, [token])
    .then(
        pool.query('')
    )
    .catch(err => res.json(err.detail))
})


app.use('/users', usersRouter)
app.use('/tokens', tokensRouter)

// app.get("/verify", secure, (req, res) => {
//   res.send("Verify route");
// });

app.get('/error', (req, res) => {
    res.status(403).send('The token is not provided')
})


app.listen(3002, console.log(`Server is running`));
