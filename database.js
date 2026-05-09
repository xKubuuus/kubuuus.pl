const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
    ip: String,
    userAgent: String,
    timestamp: {type: Date, default: Date.now }
});

const counterSchema = new mongoose.Schema({
    totalViews: {type: Number, default: 0}
});

const View = mongoose.model("View", viewSchema);
const Counter = mongoose.model("Counter", counterSchema);

const connect = async () => mongoose.connect(process.env.MONGO).then(r => console.log("Connected to MongoDB")).catch(e => console.error("Error connecting to MongoDB:", e));

module.exports = { View, Counter, connect };