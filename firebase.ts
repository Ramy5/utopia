import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAw9QWG9eoWB_TtONDVdOszhMD7tX7S1gM",
  authDomain: "utopia-63ebc.firebaseapp.com",
  databaseURL: "https://utopia-63ebc-default-rtdb.firebaseio.com",
  projectId: "utopia-63ebc",
  storageBucket: "utopia-63ebc.appspot.com",
  messagingSenderId: "796421589574",
  appId: "1:796421589574:web:7fe92d1d4f5e0727ff1847",
  measurementId: "G-4ZB0Y0E15J",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const getTokenAsync = async (setFcmToken, toast) => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      console.log("Service Worker registered with scope:", registration.scope);

      const token = await getToken(messaging, {
        vapidKey:
          "BN_9ykRfUKHz4Jm0DG4CL95cLJm3Qcy4mZlj1t0_2_ThfrCVFKfbuXQojCbyMtxB_eHSyEgp5xp-H8lvj_wwZSQ",
        serviceWorkerRegistration: registration,
      });

      if (token) {
        setFcmToken(token);
        console.log("FCM Token: ", token);
      } else {
        console.log("No registration token available.");
      }
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.log(`Error fetching FCM token: ${error}`);
    console.error("Error fetching FCM token:", error);
  }
};

export { messaging, getToken };
