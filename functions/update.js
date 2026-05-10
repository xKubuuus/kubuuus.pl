const LanyardApi = require("./lanyard");

const config = require("../config.js");

async function UpdateData() {
    try {
        const data = await LanyardApi.fetchLanyardData(config.discordId);
        if (data) {
            global.data = data;
        }
    } catch (e) {
        console.error("Błąd podczas aktualizacji danych Lanyard:", e);
    }
}

module.exports = { UpdateData };