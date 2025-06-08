const admin = require('firebase-admin');
const serviceAccount = require('./secret/crudfirebase-1c90d-firebase-adminsdk-tr7j9-03de8ab9fe.json'); // Replace with your file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://crudfirebase-1c90d.firebaseio.com'
});

const db = admin.database();

module.exports = db;
