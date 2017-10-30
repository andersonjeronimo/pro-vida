export class FirebaseConfig {
  config = {
    apiKey: 'AIzaSyDxHsbWF2TW7aCC6k13uPCcscmoZ7RqDEg',
    authDomain: 'biblioteca-pro-vida.firebaseapp.com',
    databaseURL: 'https://biblioteca-pro-vida.firebaseio.com',
    projectId: 'biblioteca-pro-vida',
    storageBucket: 'biblioteca-pro-vida.appspot.com',
    messagingSenderId: '4468655282'
  };

  getConfig() {
    return this.config;
  }
}
