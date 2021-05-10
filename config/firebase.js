const firebase_admin = require("firebase-admin");
const serviceAccount = require("./covidtracker-62e5c-firebase-adminsdk-mixm0-24207d6d79.json");

const admin = firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(serviceAccount),
  databaseURL:
    "firebase-adminsdk-mixm0@covidtracker-62e5c.iam.gserviceaccount.com",
});

module.exports = { admin };
