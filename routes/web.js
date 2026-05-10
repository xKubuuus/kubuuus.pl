const express = require('express');
const db = require("../database");
const config = require("../config");
const pckge = require("../package.json");
const router = express.Router();

// GET /
router.get('/', async (req, res) => {
    const counter = await db.Counter.findOne();

    res.render("main", { config: config, views: counter ? counter.totalViews : 0, user: global.data, version: pckge.version });
});

module.exports = router;