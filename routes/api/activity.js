const express = require('express');
const LanyardAPI = require('../../providers/lanyard.js');
const router = express.Router();

const cfg = require('../../config.js');

// GET /api/activity
router.get('/', async (req, res) => {
    await LanyardAPI.fetchLanyardData(cfg.lanyard.discordId);
    res.json(global.data?.activity || null);
});

module.exports = router;