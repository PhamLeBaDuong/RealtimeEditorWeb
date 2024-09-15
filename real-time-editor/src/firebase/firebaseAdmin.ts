var admin = require("firebase-admin");
const functions = require("firebase-functions");

var serviceAccount = require(".credential/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://realtimeeditor-28c27-default-rtdb.firebaseio.com"
});

exports.getUserIdByEmail = functions.https.onCall(async (data: { email: any; }, context: any) => {
  const email = data.email;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return { uid: userRecord.uid };
    
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new functions.https.HttpsError("not-found", "User not found.");
  }
});

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

