const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage, getDownloadURL } = require('firebase-admin/storage');

const serviceAccount = require('./service.json');
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'ndvi-rpi.appspot.com'
});

const getImageMapped = () => {
// initializeApp({
//   credential: cert(serviceAccount),
//   storageBucket: 'ndvi-rpi.appspot.com'
// });

let mappedURL;
const bucket = getStorage().bucket();
const fileRefMapped = bucket.file('color_mapped_image.png')
// const downloadURL = getDownloadURL(fileRefMapped).then((data) => {
//   mappedURL = data;
//   return mappedURL
// }).catch((err) => {
//   console.log(err)
// })
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
//   initializeApp({
//   credential: cert(serviceAccount),
//   storageBucket: 'ndvi-rpi.appspot.com'
// });

let mappedURL;
const bucket = getStorage().bucket();
const fileRefMapped = bucket.file('raw.png')
// const downloadURL = getDownloadURL(fileRefMapped).then((data) => {
//   mappedURL = data;
//   return mappedURL
// }).catch((err) => {
//   console.log(err)
// })
return new Promise((resolve, reject) => {
  getDownloadURL(fileRefMapped)
    .then((data) => {
      resolve(data)
    }).catch((err) => {
      reject(err)
    })
})
}


// getImageRaw().then((data) => {
//   console.log(data)
// }).catch((err) => {
//   console.log(err)
// })

module.exports = { getImageMapped, getImageRaw }