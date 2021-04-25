module.exports = (app, db) => {
  app.get('/users', (req, res) => {
    res.json({
      meta: {},
      items: db.get('users').value()
    })
  })
}