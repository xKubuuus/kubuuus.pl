require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const {join} = require("node:path");
const db = require("./database.js");
const { UpdateData } = require("./functions/update.js");

const app = express();
const PORT = process.env.PORT || 3000;

db.connect();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hbs.registerPartials(join(__dirname, 'views/partials'));

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use('/', require("./routes/web"));
app.use('/api/activity', require("./routes/api/activity"));
app.use('/api/view', require("./routes/api/view"));

app.listen(PORT,  async () => {
    await UpdateData();

    setInterval(() => UpdateData(), 30000);

    console.log(`Server is running on port ${PORT}`);
});

