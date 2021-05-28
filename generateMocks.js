const Chance = require('chance')
const chance = new Chance('user-admin-mock-data')

const generateUser = (id) => ({
  id: chance.guid(),
  name: chance.name()
})

const generateUsers = () => ids.map(generateUser)

module.exports = (db = null) => {
  const users = generateUsers()

  if (db) {
    const updateDB = (key, data) => db.get(key).push(...data).write()

    updateDB('users', users)
  }

  return {
    users
  }
}