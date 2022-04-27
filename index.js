// Imports
require("dotenv").config();
const got = require("got");
const {
  ToadScheduler,
  SimpleIntervalJob,
  AsyncTask,
} = require("toad-scheduler");

const getAvailableAppointments = require("./getAvailableAppointments");
const getBookingPageHtml = require("./getBookingPageHtml");
const sendTelegramNotification = require("./sendTelegramNotification");

// Setup simple scheduler
const scheduler = new ToadScheduler();
const checkForAppointmentsTask = new AsyncTask(
  "checkForAppointments",
  checkForAppointments,
  handleErrors
);
const job = new SimpleIntervalJob(
  { minutes: process.env.CHECK_INTERVAL_MINUTES, runImmediately: true },
  checkForAppointmentsTask
);
scheduler.addSimpleIntervalJob(job);

async function checkForAppointments() {
  console.log("=== Checking ===", new Date());
  let bookingPageHtml = await getBookingPageHtml();
  const slots = getAvailableAppointments(bookingPageHtml);
  console.log("Slots: ", slots);

  if (slots.length > 0) {
    let message = `Buergeramt appointments are available now!\n`;
    slots.forEach((slot) => {
      message += `${slot.date.toLocaleDateString()}: ${slot.url}\n`;
    });
    await sendTelegramNotification(message);
  }

  // Ping healthchecks.io
  if (process.env.HEALTHCHECKS_IO_TOKEN) {
    await got(`https://hc-ping.com/${process.env.HEALTHCHECKS_IO_TOKEN}`);
  }
}

async function handleErrors(err) {
  console.error(err);
  await sendTelegramNotification(JSON.stringify(err));
}
