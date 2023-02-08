const got = require("got");
const { HttpsProxyAgent } = require("hpagent");

const getProxy = require("./getProxy");

async function getBookingPageHtml() {
  // Request booking url to receive the booking system cookie
  const proxy = await getProxy();
  const agent = {
    http: new HttpsProxyAgent({
      keepAlive: true,
      keepAliveMsecs: 1000,
      maxSockets: 256,
      maxFreeSockets: 256,
      scheduling: "lifo",
      proxy,
    }),
  };

  let res = await got(process.env.BOOKING_URL, {
    headers: { "user-agent": process.env.USER_AGENT },
    followRedirect: false,
    agent,
  });

  // Get cookie
  const cookie = res.headers["set-cookie"][0];

  // Request appointment page using the cookie
  res = await got("https://service.berlin.de/terminvereinbarung/termin/day/", {
    headers: {
      cookie: cookie,
      "user-agent": process.env.USER_AGENT,
    },
    followRedirect: false,
    agent,
  });
  return res.body;
}

module.exports = getBookingPageHtml;
