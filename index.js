const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require('path');

const router = require('./routes/data.routes')

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static("./client/build"))


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
}

app.use('/', router);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})





app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});