const express = require('express');
const router = express.Router();
const { handleYoutubeReq } = require('../controllers/youtube/youtube');


router.get('/:q', handleYoutubeReq );

module.exports = router;
//https://www.googleapis.com/youtube/v3/search?part=snippet&q=dog&key=AIzaSyC8DeHyRAexKryfGdJtPnlMy5R4klhFo5k

