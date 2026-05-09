const express = require('express');
const { UpdateData } = require("../../functions/update.js");
const router = express.Router();

// GET /api/activity
router.get('/', async (req, res) => {
    await UpdateData();
    res.json(global.data?.activity || null);
});

module.exports = router;