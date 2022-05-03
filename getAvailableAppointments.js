const cheerio = require("cheerio");

function getAvailableAppointments(html) {
  const $ = cheerio.load(html);
  const appointmentLinks = $("td.buchbar a");
  return appointmentLinks
    .map((_, appointmentLink) => {
      // url
      const appointmentUrl = appointmentLink.attribs["href"];
      const hostUrl = new URL(process.env.BOOKING_URL).origin;

      // date
      let appointmentDate = appointmentUrl.split("/")[4];
      appointmentDate = new Date(appointmentDate * 1000);
      appointmentDate = Intl.DateTimeFormat("de-DE").format(appointmentDate);
      return { date: appointmentDate, url: hostUrl + appointmentUrl };
    })
    .toArray();
}

module.exports = getAvailableAppointments;
