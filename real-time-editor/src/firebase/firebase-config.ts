const config = {
    apiKey: "AIzaSyBqTSQM-kTEqW6zpLcpZkiToCqCzuOeGrw",
    authDomain: "realtimeeditor-28c27.firebaseapp.com",
    projectId: "realtimeeditor-28c27",
    storageBucket: "realtimeeditor-28c27.appspot.com",
    messagingSenderId: "892047060883",
    appId: "1:892047060883:web:79fafa0f544769a6c08266"
  };

  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.ts');
    } else {
      return config;
    }
  }   