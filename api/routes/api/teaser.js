const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const router = express.Router();

getContent = async slug => {
  let url = `https://www.highsnobiety.com/p/${slug}`;
  let res = await axios.get(url);
  let html = res.data;
  const $ = await cheerio.load(html);
  const title = $('meta[property="og:title"]').attr("content");
  const image = $('meta[property="og:image"]').attr("content");
  const description = $('meta[property="og:description"]').attr("content");
  return { title: title, imgUrl: image, excerpt: description };
};

router.get("/:slug", async (req, res) => {
  try {
    const responseBody = await getContent(req.params.slug);
    res.status(200).json(responseBody);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ msg: err.message });
  }
});

module.exports = router;
