const cheerio = require("cheerio");

function getAvailableAppointments(html) {
  const $ = cheerio.load(html);
  const appointmentLinks = $("td.buchbar a");
  return appointmentLinks
    .map((_, appointmentLink) => {
      const appointmentUrl = appointmentLink.attribs["href"];
      const appointmentDate = appointmentUrl.split("/")[4];
      return { date: new Date(appointmentDate * 1000), url: appointmentUrl };
    })
    .toArray();
}

module.exports = getAvailableAppointments;
