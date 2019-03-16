const axios = require('axios');
const { youtubeApi } = require('./consts');
const indexTemplate = require('../../views/index');

async function handleYoutubeReq(req, res) {

    const data = await axios.get(`${youtubeApi.BASE_ADDR}/search?part=snippet&q=${req.params.q}&key=${youtubeApi.API_KEY}`);
    //res.send(JSON.stringify(data.data));
    res.marko(indexTemplate, data.data.items[0].kind);
}

module.exports = {handleYoutubeReq};

