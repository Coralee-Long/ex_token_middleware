const secure = (req, res, next) => {
    console.log(req.query);
    if (req.query.token && req.query.token.length > 3) {
      next();
    } else {
      res.redirect('/error')
    }
  };


  module.exports = secure