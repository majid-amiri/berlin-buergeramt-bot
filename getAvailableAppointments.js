const cheerio = require("cheerio");

function getAvailableAppointments(html) {
  const $ = cheerio.load(html);
  const appointmentLinks = $("td.buchbar a");
  return appointmentLinks
    .map((_, appointmentLink) => {
      const appointmentUrl = appointmentLink.attribs["href"];
      let appointmentDate = appointmentUrl.split("/")[4];
      appointmentDate = new Date(appointmentDate * 1000).toLocaleDateString(
        "de-DE",
        {
          timeZone: "Europe/Berlin",
        }
      );

      return { date: appointmentDate, url: process.env.BOOKING_URL };
    })
    .toArray();
}

module.exports = getAvailableAppointments;
