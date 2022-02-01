const router = require("express").Router();
const axios = require('axios');


// ************** this file is to test API calls ( not functional ) ****************

router.get('/:id', async (req, res, next) => {
    try {
        const playlistId = '37i9dQZF1DWXb9I5xoXLjp'
        const { data: response } = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                authorization: req.headers.authorization,
            },
        });
        let max = response.tracks.items.length;
        // create a rendom number function
        function generateSongNum() {
            return Math.floor(Math.random() * max);
        };
        const songNumber = generateSongNum();
        // this will send the track url and inforation to the player
        res.json(response.tracks.items[songNumber].track)
        // the next line will send the track url only.
        // res.json(response.tracks.items[songNumber].track.external_urls.spotify)
    } catch (err) {
        next(err)
    }
})

module.exports = router