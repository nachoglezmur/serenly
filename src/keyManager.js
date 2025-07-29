// --- Almacén de Fragmentos Ofuscados ---

const _obfuscatedFragments = {
  firebaseApiKey: {
    // Clave correcta: AIzaSyDy9i5iLnrSbhSVUKpb_PdK7f39AgHL2fk
    // El error original era una 'K' duplicada entre part2 y part3.
    part1: "QUl6YVN5RHk5aTVp",         // -> btoa("AIzaSyDy9i5i")
    part3: "S3BiX1BkSzdmMzlBZ0hMMmZr", // -> btoa("Kpb_PdK7f39AgHL2fk")
    // --- CORRECCIÓN DEFINITIVA AQUÍ ---
    // Se elimina la 'K' del final para que no se duplique con la del inicio de part3.
    part2: "TG5yU2JoU1ZV",             // -> btoa("LnrSbhSVU")
  },
  openRouterApiKey: {
    // Clave original: sk-or-v1-bf14...fe3961
    prefix: "sk-or-v1-",
    reversedSuffix: "1693efbe2ecf4816",
    middlePartB64: "YmYxNGJjZmQyMDU5N2ZkYmQxODk5YWQ0NWMwMDcxMTk4OTdhM2JlYWMxZjY4NDUw",
  }
};


// --- Lógica Interna de Reconstrucción (No exportada) ---

const _reconstructedKeys = {};

const _fromB64 = (encoded) => {
  try { return atob(encoded); } 
  catch (e) { console.error("Error decodificando fragmento:", e); return ""; }
};

const _reverseStr = (str) => str.split('').reverse().join('');


// --- Funciones Públicas (Exportadas) ---

export const getFirebaseConfig = () => {
  if (!_reconstructedKeys.firebase) {
    const { part1, part2, part3 } = _obfuscatedFragments.firebaseApiKey;
    
    // Se reconstruye la clave en el orden correcto
    const apiKey = `${_fromB64(part1)}${_fromB64(part2)}${_fromB64(part3)}`;
    
    _reconstructedKeys.firebase = {
      apiKey: apiKey,
      authDomain: "serenly-9ea88.firebaseapp.com",
      projectId: "serenly-9ea88",
      storageBucket: "serenly-9ea88.appspot.com",
      messagingSenderId: "952363762800",
      appId: "1:952363762800:web:6931d4db92205eb53c20b5",
      measurementId: "G-8V9VH3RR2C"
    };
  }
  return _reconstructedKeys.firebase;
};

export const getOpenRouterKey = () => {
  if (!_reconstructedKeys.openRouter) {
    const { prefix, middlePartB64, reversedSuffix } = _obfuscatedFragments.openRouterApiKey;
    const apiKey = `${prefix}${_fromB64(middlePartB64)}${_reverseStr(reversedSuffix)}`;
    _reconstructedKeys.openRouter = apiKey;
  }
  return _reconstructedKeys.openRouter;
};