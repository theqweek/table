const db = require('../db')

class UserController {

  async createData (req, res) {
    const {id, name, date, amount, distance} = req.body;
    const newData = db.query(`INSERT INTO mydata (id, name, date, amount, distance) values ($1, $2, $3, $4, $5) RETURNING *`, [id, name, date, amount, distance])
    res.json(newData)
  }


  async getData (req, res) {
    const data = await db.query('select * from mydata;')
    res.send(data.rows)
  }
}

module.exports = new UserController();