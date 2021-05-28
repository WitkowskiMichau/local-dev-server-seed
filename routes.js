module.exports = (app, db) => {
  app.get('/users', (req, res) => {
    res.json({
      meta: {},
      items: db.get('users').value()
    })
  })

  app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    console.log('req', req.body)
    res.json(
      db.get('users')
        .find({ id })
        .assign(req.body)
        .write()
    )
  })
}