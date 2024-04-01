import { initializeApp, getApp, getApps } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as ImageManipulator from 'expo-image-manipulator';

interface FirebaseCheck {
  downloadUrl: string | undefined;
}
const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
const storageBucket = process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET;
const appId = process.env.EXPO_PUBLIC_FIREBASE_APP_ID;
const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;
const authDomain = process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN;

// Initialize Firebase
const firebaseConfig = {
  apiKey,
  storageBucket,
  appId,
  projectId,
  authDomain,
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const fbApp = getApp();
const fbStorage = getStorage();

const uploadToFirebase = async (
  uri: string | undefined,
  name: string | undefined,
): Promise<FirebaseCheck> => {
  if (uri === undefined) return { downloadUrl: 'Must have Image' };
  const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
    format: ImageManipulator.SaveFormat.JPEG,
  });
  const response = await fetch(manipResult.uri);
  const theBlob = await response.blob();
  const imageRef = ref(getStorage(), `images/${name}`);
  const uploadTask = uploadBytesResumable(imageRef, theBlob);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            console.log('Paused');
            break;
          case 'running':
            console.log('Running ' + progress);
            break;
        }
      },
      (error) => {
        reject(error);
      },
      //eslint-disable-next-line
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
        });
      },
    );
  });
};

export { fbApp, fbStorage, uploadToFirebase };
