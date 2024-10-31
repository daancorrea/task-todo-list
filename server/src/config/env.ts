import 'dotenv/config';

export default () => {
  const envVariables = {
    PORT: null,
    FIREBASE_API_KEY: null,
    FIREBASE_AUTH_DOMAIN: null,
    FIREBASE_PROJECT_ID: null,
    FIREBASE_STORAGE_BUCKET: null,
    FIREBASE_MESSAGING_SENDER_ID: null,
    FIREBASE_APP_ID: null,
    FIREBASE_MEASUREMENT_ID: null,
  };

  Object.keys(envVariables).forEach((x) => {
    if (process.env[x]) {
      envVariables[x] = process.env[x];
    } else {
      throw new Error(`A variável de ambiente ${x} não foi carregada.`);
    }
  });
  return envVariables;
};
