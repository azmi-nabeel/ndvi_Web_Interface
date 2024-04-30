const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage, getDownloadURL } = require('firebase-admin/storage');

const serviceAccount = require('./service.json');
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'ndvi-rpi.appspot.com'
});

const getImageMapped = () => {

let mappedURL;
const bucket = getStorage().bucket();
const fileRefMapped = bucket.file('color_mapped_image.png')

return new Promise((resolve, reject) => {
  getDownloadURL(fileRefMapped)
    .then((data) => {
      resolve(data)
    }).catch((err) => {
      reject(err)
    })
})

}

const getImageRaw = () => {

let mappedURL;
const bucket = getStorage().bucket();
const fileRefMapped = bucket.file('raw.png')

return new Promise((resolve, reject) => {
  getDownloadURL(fileRefMapped)
    .then((data) => {
      resolve(data)
    }).catch((err) => {
      reject(err)
    })
})
}


module.exports = { getImageMapped, getImageRaw }