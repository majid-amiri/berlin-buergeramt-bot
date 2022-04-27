# Berlin Bürgeramt Appointment Bot
A bot that sends a notification when a buergeramt appointment is available. 
It periodically checks the given buergeramt appointment page for new appointments. It then notifies the user using Telgram.

**Please use responsibly**: Set a USER_AGENT containing contact information in case something goes wrong.

**USE AT OWN RISK**

## Getting started
* clone the repository
```
git clone https://github.com/similicious/berlin-buergeramt-bot 
```
* cd into the cloned repository
* install dependencies
```
npm install
```
* create .env by copying .env.sample
```
cp .env.sample .env
```
* edit .env to suit your needs
```
BOOKING_URL=The link to the appointments page. Use the link behind "Termin buchen" or "Termin berlinweit suchen" buttons.
USER_AGENT=A string containing your email address
CHECK_INTERVAL_MINUTES=The interval in minutes to check
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
HEALTHCHECKS_IO_TOKEN=Optional healthchecks.io token to monitor the bot
```
* start index.js
```
node index.js
```

Optionally, you can use a node process manager like pm2 to monitor the app and automatically start the bot on boot.

## Run tests
I included some snapshots of appointment pages in various states. Execute test with
```
npm run test
```
