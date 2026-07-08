const express = require('express');
const db = require("../database");
const config = require("../config");
const pckge = require("../package.json");
const router = express.Router();

const StatsFmAPI = require("../providers/statsfm.js");

// GET /
router.get('/', async (req, res) => {
    const counter = await db.Counter.findOne();

    const renderWidgets = [];

    const apiMap = {
        topSong: 'getTopSong',
        topAlbum: 'getTopAlbum',
        topArtist: 'getTopArtist',
    };

    const partialMap = {
        topSong: 'statsfm/SongCard',
        topAlbum: 'statsfm/AlbumCard',
        topArtist: 'statsfm/ArtistCard',
    };

    function mapWidgetData(type, apiData) {
        switch (type) {
            case 'topSong':
                return {
                    cover: apiData.track.albums[0].image,
                    name: apiData.track.name,
                    artist: apiData.track.artists.map(a => a.name).join(", "),
                    streams: apiData.streams,
                };

            case 'topAlbum':
                return {
                    cover: apiData.album.image,
                    name: apiData.album.name,
                    artist: apiData.album.artists.map(a => a.name).join(", "),
                    streams: apiData.streams,
                };

            case 'topArtist':
                return {
                    artistImage: apiData.artist.image,
                    artistName: apiData.artist.name,
                    streams: apiData.streams,
                };

            default:
                return null;
        }
    }

    for (const widget of config.statsfm.enabledWidgets) {
        try {
            const methodName = apiMap[widget.type];

            if (methodName && typeof StatsFmAPI[methodName] === 'function') {
                const apiData = await StatsFmAPI[methodName](widget.range);
                const mapped = mapWidgetData(widget.type, apiData);

                if (mapped) {
                    renderWidgets.push({
                        title: widget.title,
                        partial: partialMap[widget.type],
                        ...mapped,
                    });
                }
            }
        } catch (err) {
            console.error(`Błąd ładowania widgetu ${widget.type}:`, err);
        }
    }

    res.render("main", {
        config: config,
        views: counter ? counter.totalViews : 0,
        user: global.data,
        version: pckge.version,
        widgets: renderWidgets,
    });
});

module.exports = router;