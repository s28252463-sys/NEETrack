// This is a simple script to bootstrap your admin user.
// You will need to run this ONCE from your local machine.

// 1. Make sure you have Node.js and 'ts-node' installed (`npm install -g ts-node`).
// 2. Fill in your Firebase Project configuration in a `.env` file in the root directory.
// 3. Run this script from your project root: `ts-node src/lib/bootstrap-admin.ts`

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebase/config';
import 'dotenv/config'

// !!! IMPORTANT !!!
// Replace this with YOUR Firebase Authentication user ID.
// You can find this in the Firebase Console under Authentication > Users.
const ADMIN_UID = 'E6cRkM6s6PbhW8T3b0L4VpmoeB32';

async function bootstrapAdmin() {
  if (!ADMIN_UID) {
    console.error("ERROR: Please set the ADMIN_UID variable in this script.");
    return;
  }
  
  console.log("Initializing Firebase...");
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  
  const userDocRef = doc(firestore, 'users', ADMIN_UID);
  
  console.log(`Setting admin=true for user: ${ADMIN_UID}`);
  
  try {
    await setDoc(userDocRef, { admin: true }, { merge: true });
    console.log("Successfully set admin role. You can now close this script.");
  } catch (error) {
    console.error("Failed to set admin role:", error);
    console.log("Please check your Firebase config and security rules.");
  }
  
  // The script will hang, this is expected. You can manually exit with Ctrl+C.
  // We don't call process.exit() to allow Firestore time to write.
}

bootstrapAdmin();
