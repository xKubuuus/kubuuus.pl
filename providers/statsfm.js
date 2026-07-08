const config = require("../config.js");

const StatsRange = Object.freeze({
    WEEKS: 'weeks',
    MONTHS: 'months',
    LIFETIME: 'lifetime'
});

let userId = null;

function validate(range) {
    if (!Object.values(StatsRange).includes(range)) {
        throw new Error(`Nieprawidłowy zakres: "${range}". Użyj struktury StatsRange.`);
    }
}

async function fetchUserId(username) {
    await fetch(`https://api.stats.fm/api/v1/users/${username}`)
        .then(response => response.json())
        .then(data => {
            userId = data.item.id;
            return data.item.id;
        })
        .catch(error => {
            console.error('Error fetching user ID:', error);
        });
}

async function getTopSong(range = StatsRange.WEEKS) {
    validate(range);

    try {
        const response = await fetch(`https://api.stats.fm/api/v1/users/${userId}/top/tracks?range=${range}`);
        const jsonData = await response.json();

        return jsonData.items[0];
    } catch (error) {
        console.error('Error fetching top song:', error);
        return null;
    }
}

async function getTopAlbum(range = StatsRange.WEEKS) {
    validate(range);

    try {
        const response = await fetch(`https://api.stats.fm/api/v1/users/${userId}/top/albums?range=${range}`);
        const jsonData = await response.json();

        return jsonData.items[0];
    } catch (error) {
        console.error('Error fetching top song:', error);
        return null;
    }
}

async function getTopAlbum(range = StatsRange.WEEKS) {
    validate(range);

    try {
        const response = await fetch(`https://api.stats.fm/api/v1/users/${userId}/top/albums?range=${range}`);
        const jsonData = await response.json();

        return jsonData.items[0];
    } catch (error) {
        console.error('Error fetching top song:', error);
        return null;
    }
}

async function getTopArtist(range = StatsRange.WEEKS) {
    validate(range);

    try {
        const response = await fetch(`https://api.stats.fm/api/v1/users/${userId}/top/artists?range=${range}`);
        const jsonData = await response.json();

        return jsonData.items[0];
    } catch (error) {
        console.error('Error fetching top song:', error);
        return null;
    }
}


module.exports = {
    StatsRange,
    fetchUserId,
    getTopSong,
    getTopAlbum,
    getTopArtist,
}