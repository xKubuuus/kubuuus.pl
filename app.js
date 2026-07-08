require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const {join} = require("node:path");
const db = require("./database.js");
const LanyardAPI = require("./providers/lanyard.js");
const StatsFmAPI = require("./providers/statsfm.js");

const cfg = require("./config.js");

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
    await LanyardAPI.fetchLanyardData(cfg.lanyard.discordId);

    if(cfg.statsfm.username) await StatsFmAPI.fetchUserId(cfg.statsfm.username);

    setInterval(() => LanyardAPI.fetchLanyardData(cfg.lanyard.discordId), 30000);

    console.log(`Server is running on port ${PORT}`);
});