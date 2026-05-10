const express = require('express');
const db = require("../../database");
const router = express.Router();

const VIEW_EXPIRATION_HOURS = 6;

// POST /api/view
router.post('/', async (req, res) => {
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0].trim();
    const userAgent = req.headers['user-agent'];
    let counter = await db.Counter.findOne();

    const recentView = await db.View.findOne({
        ip,
        userAgent,
        timestamp: { $gt: new Date(Date.now() - VIEW_EXPIRATION_HOURS * 3600 * 1000) }
    });

    if (!recentView) {
        await new db.View({ ip, userAgent }).save();
        counter = await db.Counter.findOneAndUpdate({}, { $inc: { totalViews: 1 } }, { upsert: true, new: true });
    }

    res.sendStatus(200);
});

module.exports = router;