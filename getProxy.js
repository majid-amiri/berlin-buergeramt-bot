const got = require("got");
const cheerio = require("cheerio");

const getProxy = async () => {
  const res = await got("https://sslproxies.org/");
  const $ = cheerio.load(res.body);

  const ips = $("div#raw textarea").html().split("\n");
  const list = ips.slice(3, ips.length);
  const randomProxy = list[Math.floor(Math.random() * list.length)];

  return `http://${randomProxy}`;
};

module.exports = getProxy;
