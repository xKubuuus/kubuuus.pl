const LanyardApi = require("./lanyard");

async function UpdateData() {
    try {
        const data = await LanyardApi.fetchLanyardData("404217213873029120");
        if (data) {
            global.data = data;
        }
    } catch (e) {
        console.error("Błąd podczas aktualizacji danych Lanyard:", e);
    }
}

module.exports = { UpdateData };