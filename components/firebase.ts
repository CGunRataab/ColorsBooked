import { initializeApp, getApp, getApps } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface FirebaseCheck {
  downloadUrl: string | undefined;
}

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBJO_H5YuupOF30o2qLOJVkxrb1sR580rk',
  storageBucket: 'colorbook-pic-storage.appspot.com',
  appId: '1:845026734129:web:5dbf19471497433eade510',
  projectId: 'colorbook-pic-storage',
  authDomain: 'colorbook-pic-storage.firebaseapp.com',
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
  let response;
  if (uri !== undefined) {
    response = await fetch(uri);
  } else {
    return { downloadUrl: 'Must have Image' };
  }
  const theBlob = await response.blob();
  const imageRef = ref(getStorage(), `images/${name}`);
  const uploadTask = uploadBytesResumable(imageRef, theBlob);
  console.log(name);
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
