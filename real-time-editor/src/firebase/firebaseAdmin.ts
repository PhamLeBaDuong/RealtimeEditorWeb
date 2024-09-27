var admin = require("firebase-admin");
const functions = require("firebase-functions");

var serviceAccount = require(".credential/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://realtimeeditor-28c27-default-rtdb.firebaseio.com"
});

const express = require('express');
const axios = require('axios'); // For making requests to your Cloud Function
const app = express();

app.get('/getUserId', async (req: { query: { email: any; }; }, res: { json: (arg0: { userId: any; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
  const email = req.query.email;

  try {
    const response = await axios.post(
      'https://us-central1-realtimeeditor-28c27.cloudfunctions.net/getUserIdByEmail', // Replace with your function URL
      { email: email } 
    )
    res.json({ userId: response.data }); 
  } catch (error) {
    console.error('Error fetching user ID:', error);
    res.status(500).send('Error fetching user ID');
  }
});

app.listen(5173, () => {
  console.log('Proxy server listening on port 5173');
});

// exports.getUserIdByEmail = functions.https.onCall(async (data: { email: any; }, context: any) => {
//   const email = data.email;
//   try {
//     const userRecord = await admin.auth().getUserByEmail(email);
//     return { uid: userRecord.uid };
    
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw new functions.https.HttpsError("not-found", "User not found.");
//   }
// });

// export const getUserIdByEmail = async (email: string): Promise<string | undefined> => {
//     try {
//       const userRecord = await admin.auth().getUserByEmail(email);
//       console.log('User ID:', userRecord.uid);
//       return userRecord.uid;
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       return undefined;
//     }
//   };

