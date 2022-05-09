const cheerio = require("cheerio");

function getAvailableAppointments(html) {
  const $ = cheerio.load(html);
  const appointmentLinks = $("td.buchbar a");
  return appointmentLinks
    .map((_, appointmentLink) => {
      const appointmentUrl = appointmentLink.attribs["href"];
      let appointmentDate = appointmentUrl.split("/")[4];
      appointmentDate = new Date(appointmentDate * 1000);
      appointmentDate = Intl.DateTimeFormat("de-DE").format(appointmentDate);

      return { date: appointmentDate, url: process.env.BOOKING_URL };
    })
    .toArray();
}

module.exports = getAvailableAppointments;
