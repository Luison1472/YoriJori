import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

class ImageUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file) => {
      return new Promise((resolve, reject) => {
        const storageInstance = getStorage();
        const storageRef = ref(storageInstance, 'images/' + file.name);
        
        // Use uploadBytes to initiate the upload
        uploadBytes(storageRef, file).then(snapshot => {
          // Upload completed successfully, now get the download URL
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            resolve({ default: downloadURL });
          }).catch(reject);
        }).catch(reject);
      });
    });
  }
}

export default ImageUploadAdapter;