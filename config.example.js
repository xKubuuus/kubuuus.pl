module.exports = {
    fontColor: "#ffffff", // HEX only
    iconColor: "#a8a8a8", // HEX only
    backgroundUrl: "background.mp4", // path to video (from 'public')
    opacity: 80, // 0 - 100
    description: "Hello world!",
    particles: true, // particles effect behind name
    particlesColor: "black", // black, blue, green, pink, red, white, yellow
    showViews: false, // show profile views count
    showPlayer: true, // show music player (songSource & songTitle)
    showLocation: true, // show badge with location (defined in 'location')
    showActivity: true, // show your Discord activity, provided by Lanyard
    songSource: "song.mp3", // path to song (from 'public')
    songTitle: "Test song!", // song title to display in player
    playerColor: "#ffffff", // HEX only
    albumArt: "cover.jpg", // path to cover art (from 'public')
    location: "Earth", // your location to display in badge

    // Embed for site (og properties, you can add more in /views/partials/Head.hbs)
    embed: {
        title: "Example title!",
        description: "Example description!",
        url: "https://example.com"
    },

    // Lanyard url
    baseUrl: "https://api.lanyard.rest/v1/users/",
    discordId: "1234567890" // your Discord account ID
}