   // CONFIGURACION INICIAL DE FIREBASE
   var firebaseConfig = {
       apiKey: "AIzaSyDy-XeFHKGxJyv509A67zFBALLaSSxgaKA",
       authDomain: "security-mastered.firebaseapp.com",
       projectId: "security-mastered",
       storageBucket: "security-mastered.appspot.com",
       messagingSenderId: "132785014794",
       appId: "1:132785014794:web:922fa74978833da3c637f3"
   };
   // INICIALIZAMOS FIREBASE
   // CREAMOS CONSTATANTE PARA UTILIZAR LOS SERVICIOS DE AUENTICACION Y BASE DE DATOS 
   firebase.initializeApp(firebaseConfig);
   const auth = firebase.auth();
   const db = firebase.firestore();
   var storage = firebase.storage();
   const basedatospagos = firebase.firestore();