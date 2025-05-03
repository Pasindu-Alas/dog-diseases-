var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://app-pet-vital.firebaseapp.com",
});

const db = admin.firestore();
const auth = admin.auth();
db.settings({ ignoreUndefinedProperties: true }); // Enable ignoreUndefinedProperties
module.exports = { db, auth };
