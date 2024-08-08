
const express = require("express");
const app = express();
require('dotenv').config();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/styles', express.static(path.join(__dirname, 'styles')));

const indexRouter = require("./routes/indexRouter");
app.set("view engine", "ejs");

app.use("/", indexRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
