const config = require("../config.js");

const baseUrl = config.lanyard.baseUrl;

async function fetchLanyardData(userId) {
    try {
        const response = await fetch(`${baseUrl}${userId}`);
        if (!response.ok) {
            throw new Error(`Error fetching Lanyard data: ${response.statusText}`);
        }
        let apiData = await response.json();

        // TODO: Add better way for displaying "custom status"
        if (apiData.data.activities[0] && apiData.data.activities[0].id === "custom") apiData.data.activities.shift();


        const data = {
            avatar: "https://cdn.discordapp.com/avatars/" + apiData.data.discord_user.id + "/" + apiData.data.discord_user.avatar + ".png?size=512",
            decoration: `https://cdn.discordapp.com/avatar-decoration-presets/${apiData.data.discord_user.avatar_decoration_data.asset}.png`,
            username: apiData.data.discord_user.username,
            displayName: apiData.data.discord_user.display_name,
            activity: apiData.data.activities[0] || null,
            status: apiData.data.discord_status
        }

        if (data.activity && data.activity.assets) {
            if (data.activity.assets.large_image) {
                data.activity.assets.large_image_url = getDiscordImageUrl(data.activity.application_id, data.activity.assets.large_image);
            }
            if (data.activity.assets.small_image) {
                data.activity.assets.small_image_url = getDiscordImageUrl(data.activity.application_id, data.activity.assets.small_image);
            }
        }

        switch(data.status) {
            case "online":
                data.status = "#43b581";
                break;
            case "idle":
                data.status = "#faa61a";
                break;
            case "dnd":
                data.status = "#f04747";
                break;
            case "offline":
                data.status = "#747f8d";
                break;
        }

        global.data = data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function getDiscordImageUrl(appId, assetId) {
    if (!assetId) return null;

    if (assetId.startsWith('mp:external/')) {
        return 'https://media.discordapp.net/external/' + assetId.replace('mp:external/', '');
    }

    if (assetId.startsWith('spotify:')) {
        return 'https://i.scdn.co/image/' + assetId.replace('spotify:', '');
    }

    return `https://cdn.discordapp.com/app-assets/${appId}/${assetId}.png`;
}

module.exports = { fetchLanyardData };